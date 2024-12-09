import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status) private statusRepository: Repository<Status>,
  ) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    const status = new Status();
    status.description = createStatusDto.description;
    return await this.statusRepository.save(status);
  } 

  async findAll(): Promise<Status[]> {
    return await this.statusRepository.find();
  } 

  async findOne(id: number): Promise<Status> {
    return await this.statusRepository.findOne({where: {id}}) ;
  }

  async update(id: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const status = await this.statusRepository.findOne({where: {id}});
    if(!status){
      throw new NotFoundException("Status not found");
    }
    await this.statusRepository.update({id}, updateStatusDto);
    return status;
  } 

  async remove(id: number): Promise<void> {
    const status = await this.statusRepository.findOne({where: {id}});
    if(!status){
      throw new NotFoundException("Status not found");
    }
    await this.statusRepository.delete(id);
  } 
}
