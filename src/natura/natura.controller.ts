import { Controller, Post, Body, Query, HttpCode } from '@nestjs/common';
import { NaturaService } from './natura.service';

@Controller('natura')
export class NaturaController {
  constructor(private NaturaService: NaturaService) {}

  @HttpCode(201)
  @Post()
  createAtendimento(@Body() body: any, @Query('jqlQuery') jqlQuery: string) {
    return this.NaturaService.createNaturaAndSaveJiraData(body, jqlQuery);
  }
}
