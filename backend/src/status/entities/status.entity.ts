import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Status')
export class Status {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({name: 'description', nullable: false})
    description : string;
}
