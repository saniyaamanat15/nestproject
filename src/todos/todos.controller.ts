// todos.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, ValidationPipe } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body(new ValidationPipe()) dto: CreateTodoDto) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    if (dto.images && !this.validateImageArray(dto.images)) {
      throw new BadRequestException('Invalid image format. Supported formats: .png, .jpg, .jpeg');
    }

    return this.todosService.create(dto);
  }

  private validateImageArray(images: string[]): boolean {
    const allowedExtensions = ['.png', '.jpg', '.jpeg'];
    return images.every(image => allowedExtensions.some(ext => image.toLowerCase().endsWith(ext)));
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
