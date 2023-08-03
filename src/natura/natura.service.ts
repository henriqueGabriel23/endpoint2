import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Natura from './entities/natura.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NaturaService {
  constructor(
    @InjectRepository(Natura)
    private naturaRepository: Repository<Natura>,
  ) {}
  private natura: Natura[] = [];

  async createNatura(natura: Natura): Promise<any> {
    try {
      this.natura.push(natura);
      const newNatura = this.naturaRepository.create(natura);
      await this.naturaRepository.save(newNatura);

      return newNatura;
      // return endereco;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getNaturas(): Promise<Natura[]> {
    try {
      const allNaturas = await this.naturaRepository.find();
      if (!allNaturas) {
        throw new HttpException('Não há registros', HttpStatus.NOT_FOUND);
      }

      return allNaturas;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getNatura(id: number): Promise<Natura> {
    const natura = await this.naturaRepository.findOne({
      where: { id },
    });
    if (!natura) {
      throw new HttpException('natura id não encontrado', HttpStatus.NOT_FOUND);
    }

    return natura;
  }

  async updateNatura(id: number, natura: Natura): Promise<Natura> {
    try {
      let existingNatura = await this.naturaRepository.findOne({
        where: { id },
      });

      if (!existingNatura) {
        throw new HttpException(
          `Não existe um cadastro com esse id: ${id}`,
          400,
        );
      }

      await this.naturaRepository.update(id, natura);

      existingNatura = await this.naturaRepository.findOne({
        where: { id },
      });

      return existingNatura;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteNatura(id: number): Promise<void> {
    try {
      const natura = await this.naturaRepository.findOne({
        where: { id },
      });
      if (!natura) {
        throw new HttpException(
          `Não existe um natura com o id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      await this.naturaRepository.delete(id);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
