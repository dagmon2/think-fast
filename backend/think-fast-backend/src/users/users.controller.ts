import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService, User } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('score-board')
  getUsersSorted() {
    return this.usersService.getUsersSorted();
  }

  @Post('create')
  createUser(@Body() user: User) {
    this.usersService.createUser(user);
  }

  @Post(':username/increment-score')
  incrementUserScore(@Param('username') username: string) {
    this.usersService.incrementScore(username);
  }
}
