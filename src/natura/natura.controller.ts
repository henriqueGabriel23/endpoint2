import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { NaturaService } from './natura.service';
import Natura from './entities/natura.entity';

@Controller('natura')
export class NaturaController {
  constructor(private NaturaService: NaturaService) {}

  @Post()
  createAtendimento(@Body() atendimentos: Natura) {
    return this.NaturaService.createNatura(atendimentos);
  }

  @Get()
  async getAtendimentos(): Promise<Natura[]> {
    return this.NaturaService.getNaturas();
  }

  @Get(':id')
  getAtendimento(@Param('id') id: number): Promise<Natura[]> {
    return this.NaturaService.getNatura(id).then((atendimentos) => [
      atendimentos,
    ]);
  }

  @Put(':id')
  async updateAtendimento(
    @Param('id') id: number,
    @Body() atendimento: Natura,
  ): Promise<Natura> {
    return this.NaturaService.updateNatura(id, atendimento);
  }

  @Delete(':id')
  deleteAtendimento(@Param('id') id: number): void {
    this.NaturaService.deleteNatura(id);
  }
}
