import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [UsersModule, DeviceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
