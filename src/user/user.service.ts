import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import User from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnderecoService } from 'src/endereco/endereco.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private enderecoService: EnderecoService,
  ) {}
  private user: User[] = [];

  async createUser(user: User): Promise<any> {
    try {
      this.user.push(user);
      const newUser = this.userRepository.create(user);

      await this.userRepository.save(newUser);

      return newUser;
      // return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const allUser = await this.userRepository.find();

      if (!allUser) {
        throw new HttpException('Não há registros', HttpStatus.NOT_FOUND);
      }

      return allUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(
        'Order id não encontrado',

        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async updateUser(id: number, user: User): Promise<User> {
    try {
      let existingUser = await this.userRepository.findOne({ where: { id } });

      if (!existingUser) {
        throw new HttpException(
          `Não existe um cadastro com esse id: ${id}`,
          400,
        );
      }

      await this.userRepository.update(id, user);

      existingUser = await this.userRepository.findOne({ where: { id } });

      return existingUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new HttpException(
          `Não existe um usuário com o id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      await this.userRepository.delete(id);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
