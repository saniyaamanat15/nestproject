// todos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { Images } from './entities/images.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    @InjectRepository(Images) private readonly imagesRepository: Repository<Images>,
  ) {}

  async create(dto: CreateTodoDto): Promise<Todo> {
    // Create a Todo entity
    const todo = this.todoRepository.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });

    // Save the Todo entity
    const savedTodo = await this.todoRepository.save(todo);

    // If images are provided, create Images entities and associate them with the Todo entity
    if (dto.images && dto.images.length > 0) {
      const images = dto.images.map(imagePath =>
        this.imagesRepository.create({
          user: savedTodo, // Associate with the newly created Todo entity
          path: imagePath,
          is_active: true,
        }),
      );

      // Save the Images entities
      await this.imagesRepository.save(images);
    }

    return savedTodo;
  }

  async findManyWithImages(): Promise<Todo[]> {
    return this.todoRepository.find({ relations: ['images'] });
  }

  async update(id: number, dto: CreateTodoDto): Promise<Todo | null> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    Object.assign(todo, dto);
    return await this.todoRepository.save(todo);
  }

  async delete(id: number): Promise<Todo | null> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return await this.todoRepository.remove(todo);
  }
}
