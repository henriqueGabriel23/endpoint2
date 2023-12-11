import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { JiraIssueDto } from './dto/jira-issue.dto';
import { format } from 'date-fns';

@Injectable()
export class JiraService {
  searchIssues(jqlQuery: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private httpService: HttpService) {}

  async getIssues(jqlQuery: string): Promise<JiraIssueDto[]> {
    const apiUrl = 'https://jira.brq.com/rest/api/latest/search';
    const config = {
      headers: {
        Authorization: `Basic aGVucmlxdWVtaXJhbmRhOk1hY2FxdWluaG8yMzAzIQ==`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const response: Observable<any> = await this.httpService.get(
        `${apiUrl}?jql=${jqlQuery}`,
        config,
      );

      // Espera a resposta e converte para uma Promise AxiosResponse
      const axiosResponse: AxiosResponse = await response.toPromise();

      const data: JiraIssueDto[] = axiosResponse.data.issues.map(
        (issue: {
          fields: {
            customfield_18448: any;
            customfield_18425: { [x: string]: any };
            assignee: { displayName: any };
            created: any;
            updated: any;
            resolutiondate: any;
            issuetype: { name: any };
          };
          key: any;
        }) => ({
          serviceChannel: issue.fields.customfield_18425.value,
          key: issue.key,
          assignee: issue.fields.assignee.displayName,
          created: format(
            new Date(issue.fields.created),
            'yyyy-MM-dd HH:mm:ss',
          ),
          updated: format(
            new Date(issue.fields.updated),
            'yyyy-MM-dd HH:mm:ss',
          ),
          resolutiondate: format(
            new Date(issue.fields.resolutiondate),
            'yyyy-MM-dd HH:mm:ss',
          ),
          issuetype: issue.fields.issuetype.name,
          summary: issue.fields.customfield_18448,
        }),
      );
      console.log('data', data);

      return data;
    } catch (error) {
      throw new Error('Erro ao buscar issues do Jira: ' + error.message);
    }
  }
}
