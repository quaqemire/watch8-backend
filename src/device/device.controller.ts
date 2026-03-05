import { Controller, Get } from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller('/api')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get('/device')
  getDevices() {
    return this.deviceService.getDevices();
  }

  
}
