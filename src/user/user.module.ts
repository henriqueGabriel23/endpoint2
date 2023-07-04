import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EnderecoModule } from 'src/endereco/endereco.module';
import User from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EnderecoModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
