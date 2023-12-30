import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    create(dto: CreateTodoDto): Promise<import("./entities/todo.entity").Todo>;
    private validateImageArray;
    findMany(): Promise<import("./entities/todo.entity").Todo[]>;
    update(id: number, dto: CreateTodoDto): Promise<import("./entities/todo.entity").Todo>;
    delete(id: number): Promise<import("./entities/todo.entity").Todo>;
    updateWithImages(id: number, dto: CreateTodoDto): Promise<import("./entities/todo.entity").Todo>;
}
