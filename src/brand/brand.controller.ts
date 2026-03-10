import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { JwtAuthGuard } from 'src/auth/common/jwt.guard';

@UseGuards(JwtAuthGuard)
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
