import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.description = createTodoDto.description;
    todo.user_id = createTodoDto.user_id;
    todo.due_date = createTodoDto.due_date;
    todo.status_id = createTodoDto.status_id;
    return await this.todoRepository.save(todo) ; 
  }

  async findAll(): Promise<Todo[]>  {
    return await this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    return await this.todoRepository.findOne({where: {id}}) ;
  }

  async findByUserId(userId:number): Promise<Todo[]> {
    return await this.todoRepository.find({ where: { user_id: userId } });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.findOne({where: {id}});
    if(!todo){
      throw new NotFoundException("Todo not found")
    }
    await this.todoRepository.update({id}, updateTodoDto);
    return todo;
  }

  async remove(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne({where: {id}});
    if(!todo){
      throw new NotFoundException("Todo not found");
    }
    await this.todoRepository.delete(id);
  }
}
