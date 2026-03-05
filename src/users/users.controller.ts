import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/users')
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Post('/registration')
  registration() {

  }

  @Post('/login')
  login() {
    
  }
}
