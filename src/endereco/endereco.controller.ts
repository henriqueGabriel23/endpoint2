import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import Endereco from './entities/endereco.entity';

@Controller('endereco')
export class EnderecoController {
  constructor(private enderecoService: EnderecoService) {}

  @Post()
  createEndereco(@Body() endereco: Endereco) {
    return this.enderecoService.createEndereco(endereco);
  }

  @Get()
  async getEnderecos(): Promise<Endereco[]> {
    return this.enderecoService.getEnderecos();
  }

  @Get(':id')
  getEndereco(@Param('id') id: number): Promise<Endereco[]> {
    return this.enderecoService.getEndereco(id).then((endereco) => [endereco]);
  }

  @Put(':id')
  async updateEndereco(
    @Param('id') id: number,
    @Body() endereco: Endereco,
  ): Promise<Endereco> {
    return this.enderecoService.updateEndereco(id, endereco);
  }

  @Delete(':id')
  deleteEndereco(@Param('id') id: number): void {
    this.enderecoService.deleteEndereco(id);
  }
}
