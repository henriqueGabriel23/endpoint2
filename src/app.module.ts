import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user/entities/user.entity';
import { UsersModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { EnderecoModule } from './endereco/endereco.module';
import { NaturaController } from './natura/natura.controller';
import { NaturaService } from './natura/natura.service';
import { NaturaModule } from './natura/natura.module';
import { JiraController } from './jira/jira.controller';
import { JiraService } from './jira/jira.service';
import { JiraModule } from './jira/jira.module';
import { HttpModule } from '@nestjs/axios/dist/http.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EnderecoModule,
    JiraModule,
    HttpModule,
    NaturaModule,
  ],
  controllers: [JiraController],
  providers: [JiraService],
})
export class AppModule {}
