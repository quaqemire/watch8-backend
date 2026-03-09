import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.brand.findMany();
  }

  async create(dto: CreateBrandDto) {
    return this.prisma.brand.create({ data: { ...dto } });
  }
}
