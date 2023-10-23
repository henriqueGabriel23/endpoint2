import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { EnderecoModule } from './endereco/endereco.module';
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
