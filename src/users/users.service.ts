import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany();
  }

  async create(dto: CreateUserDto) {
    return this.prisma.user.create({ data: { ...dto } });
  }
}
