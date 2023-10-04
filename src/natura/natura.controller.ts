import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
} from '@nestjs/common';
import { NaturaService } from './natura.service';
import Natura from './entities/natura.entity';

@Controller('natura')
export class NaturaController {
  constructor(private NaturaService: NaturaService) {}

  // @ApiResponse({ status: 200, description: 'Sucesso' })
  // @ApiResponse({
  //   status: 401,
  //   description: 'Ação não autorizada',
  // })
  // @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @HttpCode(201)
  @Post()
  createAtendimento(@Body() body: any, @Query('jqlQuery') jqlQuery: string) {
    return this.NaturaService.createNaturaAndSaveJiraData(body, jqlQuery);
  }

  //   @Get()
  //   async getAtendimentos(): Promise<Natura[]> {
  //     return this.NaturaService.getNaturas();
  //   }

  //   @Get(':id')
  //   getAtendimento(@Param('id') id: number): Promise<Natura[]> {
  //     return this.NaturaService.getNatura(id).then((atendimentos) => [
  //       atendimentos,
  //     ]);
  //   }

  //   @Put(':id')
  //   async updateAtendimento(
  //     @Param('id') id: number,
  //     @Body() atendimento: Natura,
  //   ): Promise<Natura> {
  //     return this.NaturaService.updateNatura(id, atendimento);
  //   }

  //   @Delete(':id')
  //   deleteAtendimento(@Param('id') id: number): void {
  //     this.NaturaService.deleteNatura(id);
  //   }
}
