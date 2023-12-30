// create-todo.dto.ts
import { IsEmail, IsArray, Validate } from 'class-validator';
import { IsEmailFormat } from '../is-email-format.validator'; // Assuming you create a file for the custom validator

export class CreateTodoDto {
  name: string;

  @IsEmail()
  @Validate(IsEmailFormat, {
    message: 'Invalid email format. Please provide a valid email address.',
  })
  email: string;

  password: string;

  @IsArray()
  images: string[];
}
