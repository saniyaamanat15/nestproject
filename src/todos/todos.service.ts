// todos.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
    if (!dto.is_active) {
      throw new BadRequestException('Cannot create an inactive record.');
    }

    const todo = this.todoRepository.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      is_active: dto.is_active,
    });

    const savedTodo = await this.todoRepository.save(todo);

    if (dto.images && dto.images.length > 0) {
      const images = dto.images.map(imagePath =>
        this.imagesRepository.create({
          user: savedTodo,
          path: imagePath,
          is_active: true,
        }),
      );

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

    if (!dto.is_active) {
      throw new BadRequestException('Cannot update to an inactive record.');
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

  async updateWithImages(id: number, dto: CreateTodoDto): Promise<Todo | null> {
    const todo = await this.todoRepository.findOne({ where: { id }, relations: ['images'] });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    if (!dto.is_active) {
      throw new BadRequestException('Cannot update to an inactive record.');
    }

    Object.assign(todo, { name: dto.name, email: dto.email, password: dto.password });

    if (dto.images && dto.images.length > 0) {
      const updatedImages = dto.images.map(imagePath => {
        const existingImage = todo.images.find(img => img.path === imagePath);
        if (existingImage) {
          existingImage.path = imagePath;
          return existingImage;
        } else {
          return this.imagesRepository.create({
            user: todo,
            path: imagePath,
            is_active: true,
          });
        }
      });

      await this.imagesRepository.save(updatedImages);

      todo.images = updatedImages;
    }

    return await this.todoRepository.save(todo);
  }
}
