import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user/entities/user.entity';
import { UsersModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { EnderecoModule } from './endereco/endereco.module';
import { NaturaController } from './natura/natura.controller';
import { NaturaService } from './natura/natura.service';
import { NaturaModule } from './natura/natura.module';

@Module({
  imports: [UsersModule, DatabaseModule, EnderecoModule, NaturaModule],
  controllers: [NaturaController],
  providers: [NaturaService],
})
export class AppModule {}
