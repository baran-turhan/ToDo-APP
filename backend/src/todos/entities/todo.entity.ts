import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Todo')
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'description'})
    description: string;

    @Column({name: 'user_id'})
    user_id: number;

    @Column({name: 'due_date'})
    due_date: Date;
    
    @Column({name: 'status_id'})
    status_id: number;
}
