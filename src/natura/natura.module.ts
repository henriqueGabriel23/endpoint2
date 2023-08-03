import { Module } from '@nestjs/common';
import { NaturaController } from './natura.controller';
import { NaturaService } from './natura.service';
import Natura from './entities/natura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Natura])],
  controllers: [NaturaController],
  providers: [NaturaService],
})
export class NaturaModule {}
