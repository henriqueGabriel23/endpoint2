import { Controller, Get } from '@nestjs/common';
import { JiraService } from './jira.service';
import { JiraIssueDto } from './dto/jira-issue.dto';

@Controller('jira')
export class JiraController {
  constructor(private jiraService: JiraService) {}

  @Get('issues')
  async getIssues(): Promise<JiraIssueDto[]> {
    const jqlQuery = encodeURIComponent(
      'project = "Avon 2022 Outsourcing" AND "Canal de Atendimento" in ("Consultoria de Beleza Oficial", "Líderes de Negócios", "Novidades da Semana", "TikTok", "Youtube") AND resolutiondate is not EMPTY AND resolved >= startOfMonth(-4) AND resolved < startOfMonth()',
    );

    try {
      const data = await this.jiraService.getIssues(jqlQuery);
      console.log('data', data);

      return data;
    } catch (error) {
      console.log(error);

      throw new Error('Erro ao buscar issues do Jira: ' + error.message);
    }
  }
}
