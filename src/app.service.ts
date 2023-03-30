import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // async findOne(id: number) {
  //   return this.usersRepository.findOne({ id });
  // }

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  // async update(id: number, user: User): Promise<User> {
  //   await this.usersRepository.update(id, user);
  //   return this.findOne(id);
  // }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
