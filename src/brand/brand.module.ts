import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports: [PrismaModule],
})
export class BrandModule {}
