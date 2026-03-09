import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService],
  imports: [PrismaModule],
})
export class DeviceModule {}
