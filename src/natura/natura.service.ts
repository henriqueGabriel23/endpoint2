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
    try {
      // Chama o serviço do Jira com a consulta JQL e obtém os dados
      const resultJira: JiraIssueDto[] = await this.jiraService.getIssues(
        jqlQuery,
      ); // Certifique-se de que getIssues retorne um array de JiraIssueDto

      // Salva os dados da API do Jira no banco de dados
      for (const jiraItem of resultJira) {
        await this.saveJiraDataToDatabase(jiraItem);
      }

      // Cria e salva a entidade Natura
      // const newNatura = this.naturaRepository.create(body);
      // await this.naturaRepository.save(newNatura);

      // return newNatura;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  private async saveJiraDataToDatabase(jiraItem: JiraIssueDto): Promise<void> {
    try {
      // Verifica se a chave (ou outro campo único) já existe no banco de dados
      const existingIssue = await this.naturaRepository.findOne({
        where: { key: jiraItem.key }, // Certifique-se de que a propriedade seja 'chave' em JiraIssueDto
      });

      if (!existingIssue) {
        // Se a chave não existir, então salva os dados no banco de dados
        const issue = {
          serviceChannel: jiraItem.serviceChannel,
          key: jiraItem.key,
          assignee: jiraItem.assignee,
          created: jiraItem.created,
          updated: jiraItem.updated,
          resolutiondate: jiraItem.resolutiondate,
          issuetype: jiraItem.issuetype,
        };
        console.log(issue);

        console.log(jiraItem);

        const result = this.naturaRepository.create(issue);
        await this.naturaRepository.save(result);
      }
    } catch (error) {
      console.log('error', error);

      throw new HttpException(
        'Erro ao salvar dados do Jira no banco de dados.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

//   async createNatura(natura: Natura, jqlQuery: string): Promise<any> {
//     try {
//       this.natura.push(natura);
//       const resultJira = this.jiraService.searchIssues(jqlQuery); // Chamando o serviço do Jira com a consulta JQL
//       const newNatura = this.naturaRepository.create(natura);

//       await this.naturaRepository.save(newNatura); // Salvando no banco de dados
//       console.log(resultJira);

//       return newNatura;
//     } catch (error) {
//       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
//     }
//   }
//   async getNaturas(): Promise<Natura[]> {
//     try {
//       const allNaturas = await this.naturaRepository.find();
//       if (!allNaturas) {
//         throw new HttpException('Não há registros', HttpStatus.NOT_FOUND);
//       }

//       return allNaturas;
//     } catch (error) {
//       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
//     }
//   }

//   async getNatura(id: number): Promise<Natura> {
//     const natura = await this.naturaRepository.findOne({
//       where: { id },
//     });
//     if (!natura) {
//       throw new HttpException('natura id não encontrado', HttpStatus.NOT_FOUND);
//     }

//     return natura;
//   }

//   async updateNatura(id: number, natura: Natura): Promise<Natura> {
//     try {
//       let existingNatura = await this.naturaRepository.findOne({
//         where: { id },
//       });

//       if (!existingNatura) {
//         throw new HttpException(
//           `Não existe um cadastro com esse id: ${id}`,
//           400,
//         );
//       }

//       await this.naturaRepository.update(id, natura);

//       existingNatura = await this.naturaRepository.findOne({
//         where: { id },
//       });

//       return existingNatura;
//     } catch (error) {
//       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
//     }
//   }

//   async deleteNatura(id: number): Promise<void> {
//     try {
//       const natura = await this.naturaRepository.findOne({
//         where: { id },
//       });
//       if (!natura) {
//         throw new HttpException(
//           `Não existe um natura com o id: ${id}`,
//           HttpStatus.NOT_FOUND,
//         );
//       }
//       await this.naturaRepository.delete(id);
//       return;
//     } catch (error) {
//       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
//     }
//   }
