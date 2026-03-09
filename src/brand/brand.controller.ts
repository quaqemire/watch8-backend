import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get()
  getAll() {
    return this.brandService.getAll();
  }

  @Post()
  create(@Body() dto: CreateBrandDto) {
    return this.brandService.create(dto);
  }
}
