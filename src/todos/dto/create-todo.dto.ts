// create-todo.dto.ts
import { IsNotEmpty, IsEmail, IsArray, IsString, ArrayMinSize, IsBoolean } from 'class-validator';
import { IsEmailFormat } from '../is-email-format.validator'; // Correct import

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  // @IsEmailFormat({ message: 'Invalid email format' }) // Add this line
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  images: string[];

  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;
}
