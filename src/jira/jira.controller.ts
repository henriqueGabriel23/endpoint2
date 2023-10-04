import { Controller, Get, Param } from '@nestjs/common';
import { JiraService } from './jira.service';
import { JiraIssueDto } from './dto/jira-issue.dto';

@Controller('jira')
export class JiraController {
  constructor(private jiraService: JiraService) {}

  @Get('issues')
  async getIssues(): Promise<JiraIssueDto[]> {
    const jqlQuery = encodeURIComponent(
      'project = "Avon 2022 Outsourcing" AND "Canal de Atendimento" in ("Consultoria de Beleza Oficial","Líderes de Negócios","Novidades da Semana",TikTok,Youtube)',
    );

    try {
      const data = await this.jiraService.getIssues(jqlQuery);
      return data;
    } catch (error) {
      console.log(error);

      throw new Error('Erro ao buscar issues do Jira: ' + error.message);
    }
  }
}
