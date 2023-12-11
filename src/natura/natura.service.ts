import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Natura from './entities/natura.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JiraService } from 'src/jira/jira.service';
import { JiraIssueDto } from '../jira/dto/jira-issue.dto'; // Importe a classe JiraIssueDto
@Injectable()
export class NaturaService {
  constructor(
    @InjectRepository(Natura)
    private naturaRepository: Repository<Natura>,
    private readonly jiraService: JiraService,
  ) {}
  private natura: any[] = [];

  async createNaturaAndSaveJiraData(body: any, jqlQuery: string): Promise<any> {
    console.log('jqlQuerytest', jqlQuery);

    try {
      // Chama o serviço do Jira com a consulta JQL e obtém os dados
      const resultJira: JiraIssueDto[] = await this.jiraService.getIssues(
        jqlQuery,
      );
      console.log('resultJira', resultJira);

      // Salva os dados da API do Jira no banco de dados
      for (const jiraItem of resultJira) {
        await this.saveJiraDataToDatabase(jiraItem);
      }
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  private async saveJiraDataToDatabase(jiraItem: JiraIssueDto): Promise<void> {
    try {
      const existingIssue = await this.naturaRepository.findOne({
        where: { key: jiraItem.key },
      });

      if (!existingIssue) {
        const issue = {
          serviceChannel: jiraItem.serviceChannel,
          key: jiraItem.key,
          assignee: jiraItem.assignee,
          created: jiraItem.created,
          updated: jiraItem.updated,
          resolutiondate: jiraItem.resolutiondate,
          issuetype: jiraItem.issuetype,
          summary: jiraItem.summary,
        };
        console.log('jira', jiraItem);
        const result = this.naturaRepository.create(issue);
        await this.naturaRepository.save(result);
      }
    } catch (error) {
      throw new HttpException(
        'Erro ao salvar dados do Jira no banco de dados.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getTest() {
    try {
      const result = await this.naturaRepository.find();
      return result;
    } catch (error) {
      throw new Error('Erro ao buscar issues do Jira: ' + error.message);
    }
  }
}
