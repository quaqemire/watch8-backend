import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/common/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  appService: any;
  constructor() {}

  @Get('/goods')
  getGoods() {
    return this.appService.getGoods();
  }
}
