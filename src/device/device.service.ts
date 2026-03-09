import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateDeviceDto } from './dto/create-device.dto';

interface DeviceFilter {
  brandId?: number;
  typeId?: number;
  limit: number;
  offset: number;
}

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  async getAll(filter?: DeviceFilter) {
    try {
      const devices = await this.prisma.device.findMany({
        where: {
          brandId: filter?.brandId,
          typeId: filter?.typeId,
        },
        take: filter?.limit,
        skip: filter?.offset,
      });

      const count = await this.prisma.device.count({
        where: {
          brandId: filter?.brandId,
          typeId: filter?.typeId,
        },
      });

      return {
        count,
        rows: devices,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException({
        message: 'Не удалось получить список устройств',
        details: error.message || error,
      });
    }
  }

  async getOne(id: number) {
    try {
      const device = this.prisma.device.findUnique({
        where: { id },
        include: {
          info: true,
          brand: true,
          type: true,
        },
      });

      if (!device) {
        throw new NotFoundException({
          message: 'Устройство не найдено',
          details: `Устройство с id=${id} не существует`,
        });
      }

      return device;
    } catch (error) {
      if (error instanceof NotFoundException) throw Error;
      console.error(error);
      throw new BadRequestException({
        message: 'Ошибка при получении устройства',
        details: error.message || error,
      });
    }
  }

  async create(dto: CreateDeviceDto, info?: any[]) {
    try {
      const device = await this.prisma.device.create({
        data: {
          name: dto.name,
          price: Number(dto.price),
          brandId: Number(dto.brandId),
          typeId: Number(dto.typeId),
          image: dto.image,
        },
      });

      if (info && info.length) {
        await this.prisma.deviceInfo.createMany({
          data: info.map((i) => ({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })),
        });
      }

      return device;
    } catch (error) {
      console.error(error);
      throw new BadRequestException({
        message: 'Не удалось создать устройство',
        details: error.message || error,
      });
    }
  }
}
