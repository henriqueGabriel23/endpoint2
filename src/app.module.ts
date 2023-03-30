import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user/entities/user.entity';
import { AppController } from './app.controller';
import { UsersService } from './app.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AppController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
