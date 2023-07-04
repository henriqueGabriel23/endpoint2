import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import User from 'src/user/entities/user.entity';
@Entity()
class Endereco extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public rua: string;
  @Column()
  public numero: number;
  @Column()
  public complemento: string;
  @Column()
  public bairro: string;
  @Column()
  public cidade: string;
  @Column()
  public estado: string;
  @Column()
  public userId: number;
  @ManyToOne(() => User, (user) => user.enderecos)
  public user: User;
}
export default Endereco;

// ID (chave primária)
// ID_Usuário (chave estrangeira referenciando o ID na tabela "Usuário")
// Rua
// Número
// Complemento
// Bairro
// Cidade
// Estado
// CEP
// País
