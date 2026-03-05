import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  getCategories() {
    return [{ id: 1, title: 'category1' }]; /*  */
  }
}
