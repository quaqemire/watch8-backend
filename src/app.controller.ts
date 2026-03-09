import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  appService: any;
  constructor() {}

  @Get('/goods')
  getGoods() {
    return this.appService.getGoods();
  }
}
