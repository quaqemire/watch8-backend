import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTypeDto } from './dto/create-type.dto';

@Injectable()
export class TypeService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.type.findMany();
  }

  async create(dto: CreateTypeDto) {
    return this.prisma.type.create({ data: { ...dto } });
  }
}
