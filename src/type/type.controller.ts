import { Body, Controller, Get, Post } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';

@Controller('type')
export class TypeController {
  constructor(private typeService: TypeService) {}

  @Get()
  getAll() {
    return this.typeService.getAll();
  }

  @Post()
  create(@Body() dto: CreateTypeDto) {
    return this.typeService.create(dto);
  }
}
