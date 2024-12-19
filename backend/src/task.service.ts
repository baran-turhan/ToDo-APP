import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LessThan, Not, Repository } from 'typeorm';
import { Todo } from './todos/entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  @Cron('* 5 * * * *')
  async handleCron() {
    this.logger.debug('Called every minute');

    const now = new Date();

    const pastTodos = await this.todoRepository.find({
        where: {
            due_date: LessThan(now),
            status_id: 4,
        }
    });


    pastTodos.forEach( (oneitem) => {
        this.todoRepository.update(
        {id : oneitem.id},
        {status_id: 3}
        );}
    );
  }
}