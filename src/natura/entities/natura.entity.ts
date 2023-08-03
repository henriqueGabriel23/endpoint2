import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
@Entity()
class Natura extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public Chave: string;
  @Column()
  public Gestor: string;
  @Column()
  public Gestor_da_Vaga: string;
  @Column()
  public Responsável: string;
  @Column()
  public Resumo: string;
  @Column()
  public Tipo_de_Item: string;
  @Column()
  public Situação: string;
  @Column()
  public Criado: number;
  @Column()
  public Atualizado: string;
  @Column()
  public Sistemas: string;
  @Column()
  public Previsão_de_Início_do_Treinamento: string;
  @Column()
  public Resolvido: string;
  @Column()
  public Data_de_Conclusão: string;
  @Column()
  public Data_de_Encerramento: string;
  @Column()
  public Data_de_Término: string;
  @Column()
  public Justificativa: string;
  @Column()
  public Justificativa_da_Solicitação: string;
  @Column()
  public Desenvolvimento: string;
  @Column()
  public Tipo: string;
  @Column()
  public Classe_de_Serviço: string;
}
export default Natura;
