import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UsersService } from './app.service';
import User from './user/entities/user.entity';
@Controller('usuario')
export class AppController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<User> {
  //   return this.usersService.findOne(Number(id));
  // }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() user: User): Promise<User> {
  //   return this.usersService.update(Number(id), user);
  // }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(Number(id));
  }
}
