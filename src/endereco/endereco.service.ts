import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Endereco from './entities/endereco.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,
  ) {}
  private endereco: Endereco[] = [];

  async createEndereco(endereco: Endereco): Promise<any> {
    try {
      this.endereco.push(endereco);
      const newEndereco = this.enderecoRepository.create(endereco);
      await this.enderecoRepository.save(newEndereco);

      return newEndereco;
      // return endereco;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getEnderecos(): Promise<Endereco[]> {
    try {
      const allEnderecos = await this.enderecoRepository.find();
      if (!allEnderecos) {
        throw new HttpException('Não há registros', HttpStatus.NOT_FOUND);
      }

      return allEnderecos;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getEndereco(id: number): Promise<Endereco> {
    const endereco = await this.enderecoRepository.findOne({ where: { id } });
    if (!endereco) {
      throw new HttpException(
        'Endereco id não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return endereco;
  }

  async updateEndereco(id: number, endereco: Endereco): Promise<Endereco> {
    try {
      let existingEndereco = await this.enderecoRepository.findOne({
        where: { id },
      });

      if (!existingEndereco) {
        throw new HttpException(
          `Não existe um cadastro com esse id: ${id}`,
          400,
        );
      }

      await this.enderecoRepository.update(id, endereco);

      existingEndereco = await this.enderecoRepository.findOne({
        where: { id },
      });

      return existingEndereco;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteEndereco(id: number): Promise<void> {
    try {
      const endereco = await this.enderecoRepository.findOne({ where: { id } });
      if (!endereco) {
        throw new HttpException(
          `Não existe um endereço com o id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      await this.enderecoRepository.delete(id);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
