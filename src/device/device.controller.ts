import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { JwtAuthGuard } from 'src/auth/common/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get()
  getAll(
    @Query('brandId') brandId?: string,
    @Query('typeId') typeId?: string,
    @Query('limit') limit?: string,
    @Query('page') page?: string,
  ) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    let offset = pageNumber * limitNumber - limitNumber;

    return this.deviceService.getAll({
      brandId: brandId ? Number(brandId) : undefined,
      typeId: typeId ? Number(typeId) : undefined,
      limit: limitNumber,
      offset,
    });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.deviceService.getOne(Number(id));
  }

  @Post()
  async create(@Body() body: any) {
    const { info, ...dto } = body;

    return this.deviceService.create(dto, info ? JSON.parse(info) : []);
  }
}
