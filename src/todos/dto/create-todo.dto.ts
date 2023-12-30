// create-todo.dto.ts
import { IsNotEmpty, IsString, IsArray, ArrayMinSize, IsBoolean, IsEmail } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' }) // Add this line
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
