import { Injectable } from '@nestjs/common';

@Injectable()
export class DeviceService {
  getDevices() {
    return [{ id: 1, title: 'powerbank' }]; /*  */
  }
}
