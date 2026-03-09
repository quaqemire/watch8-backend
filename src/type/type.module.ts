import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [TypeController],
  providers: [TypeService],
  imports: [PrismaModule],
})
export class TypeModule {}
