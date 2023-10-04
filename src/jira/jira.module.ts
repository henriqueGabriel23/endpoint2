import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JiraController } from './jira.controller';
import { JiraService } from './jira.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    HttpModule.register({
      baseURL:
        'https://jira.brq.com/rest/api/latest/search?jql=project%20%3D%20%22Avon%202022%20Outsourcing%22%20AND%20%22Canal%20de%20Atendimento%22%20in%20(%22Consultoria%20de%20Beleza%20Oficial%22%2C%22L%C3%ADderes%20de%20Neg%C3%B3cios%22%2C%22Novidades%20da%20Semana%22%2CTikTok%2CYoutube)',
    }),
  ],
  controllers: [JiraController],
  providers: [JiraService],
})
export class JiraModule {}
