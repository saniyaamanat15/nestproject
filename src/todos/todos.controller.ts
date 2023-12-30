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
    // ... (existing code)
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
}
