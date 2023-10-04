import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
class Natura extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() // Defina o valor padrão como uma string vazia
  serviceChannel: string;

  @Column() // Defina o valor padrão como uma string vazia
  key: string;

  @Column() // Defina o valor padrão como uma string vazia
  assignee: string;

  @Column() // Defina o valor padrão como uma string vazia
  created: string;

  @Column() // Defina o valor padrão como uma string vazia
  updated: string;

  @Column({ nullable: true }) // Defina o valor padrão como uma string vazia
  resolutiondate: string;

  @Column() // Defina o valor padrão como uma string vazia
  issuetype: string;
}

export default Natura;
