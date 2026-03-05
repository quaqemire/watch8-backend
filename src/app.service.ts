import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGoods() {
    return [{ id: 1, title: 'powerbank' }]; /*  */
  }
}
