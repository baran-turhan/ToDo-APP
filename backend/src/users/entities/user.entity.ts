import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('User')
export class User {
  @PrimaryGeneratedColumn() // Auto-incremented primary key
  id: number;

  @Column({name: 'name'}) // Specifies a regular column
  name: string;
  
  @Column({name: 'password'})
  password: string;
  
  @Column({name: 'email'})
  email: string;
}
