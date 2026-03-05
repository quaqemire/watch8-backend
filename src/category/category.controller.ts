import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('/api')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/categories')
  getCategories() {
    return this.categoryService.getCategories();
  }
}
