import { CreateTodoDto } from './dto/create-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { Images } from './entities/images.entity';
export declare class TodosService {
    private readonly todoRepository;
    private readonly imagesRepository;
    constructor(todoRepository: Repository<Todo>, imagesRepository: Repository<Images>);
    create(dto: CreateTodoDto): Promise<Todo>;
    findManyWithImages(): Promise<Todo[]>;
    update(id: number, dto: CreateTodoDto): Promise<Todo | null>;
    delete(id: number): Promise<Todo | null>;
    updateWithImages(id: number, dto: CreateTodoDto): Promise<Todo | null>;
}
