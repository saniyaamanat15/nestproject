// todos.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, ValidationPipe } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body(new ValidationPipe()) dto: CreateTodoDto) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }



    const existingTodo = await this.todosService.findByEmail(dto.email);
    if (existingTodo) {
      throw new BadRequestException('Person with this email already exists.');
    }

    

    if (!dto.is_active) {
      throw new BadRequestException('Cannot create an inactive record.');
    }

    if (dto.images && !this.validateImageArray(dto.images)) {
      throw new BadRequestException('Invalid image format. Supported formats: .png, .jpg, .jpeg');
    }

    return this.todosService.create(dto);
  }

  private validateImageArray(images: string[]): boolean {
    const allowedExtensions = ['.png', '.jpg', '.jpeg'];

    for (const image of images) {
      const isValidExtension = allowedExtensions.some(ext => image.toLowerCase().endsWith(ext));
      if (!isValidExtension) {
        throw new BadRequestException(`Invalid image format for image: ${image}. Supported formats: .png, .jpg, .jpeg`);
      }
    }

    return true;
  }

  @Get()
  async findMany() {
    const todosWithImages = await this.todosService.findManyWithImages();
    return todosWithImages;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body(new ValidationPipe()) dto: CreateTodoDto) {
    return this.todosService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.todosService.delete(id);
  }

  @Put(':id/images')
  updateWithImages(@Param('id') id: number, @Body(new ValidationPipe()) dto: CreateTodoDto) {
    return this.todosService.updateWithImages(id, dto);
  }
}