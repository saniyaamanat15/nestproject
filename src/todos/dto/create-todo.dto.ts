// create-todo.dto.ts
import { IsEmail, IsArray } from 'class-validator';

export class CreateTodoDto {
  name: string;
  email: string;
  password: string;

  @IsArray()
  images: string[];
}
