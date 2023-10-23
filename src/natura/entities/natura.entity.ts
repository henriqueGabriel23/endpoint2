import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
class Natura extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceChannel: string;

  @Column()
  key: string;

  @Column()
  assignee: string;

  @Column()
  created: string;

  @Column()
  updated: string;

  @Column({ nullable: true })
  resolutiondate: string;

  @Column()
  issuetype: string;

  @Column({ nullable: true })
  summary: string;
}

export default Natura;
