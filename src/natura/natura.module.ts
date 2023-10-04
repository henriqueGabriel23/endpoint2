import { Module } from '@nestjs/common';
import { NaturaController } from './natura.controller';
import { NaturaService } from './natura.service';
import Natura from './entities/natura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JiraService } from 'src/jira/jira.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Natura]), HttpModule],
  controllers: [NaturaController],
  providers: [NaturaService, JiraService],
})
export class NaturaModule {}
