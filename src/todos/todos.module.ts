// todos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { Images } from './entities/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Images])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
