"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_entity_1 = require("./entities/todo.entity");
const images_entity_1 = require("./entities/images.entity");
let TodosService = class TodosService {
    constructor(todoRepository, imagesRepository) {
        this.todoRepository = todoRepository;
        this.imagesRepository = imagesRepository;
    }
    async create(dto) {
        if (!dto.is_active) {
            throw new common_1.BadRequestException('Cannot create an inactive record.');
        }
        const todo = this.todoRepository.create({
            name: dto.name,
            email: dto.email,
            password: dto.password,
            is_active: dto.is_active,
        });
        const savedTodo = await this.todoRepository.save(todo);
        if (dto.images && dto.images.length > 0) {
            const images = dto.images.map(imagePath => this.imagesRepository.create({
                user: savedTodo,
                path: imagePath,
                is_active: true,
            }));
            await this.imagesRepository.save(images);
        }
        return savedTodo;
    }
    async findManyWithImages() {
        return this.todoRepository.find({ relations: ['images'] });
    }
    async update(id, dto) {
        const todo = await this.todoRepository.findOne({ where: { id } });
        if (!todo) {
            throw new common_1.NotFoundException(`Todo with id ${id} not found`);
        }
        if (!dto.is_active) {
            throw new common_1.BadRequestException('Cannot update to an inactive record.');
        }
        Object.assign(todo, dto);
        return await this.todoRepository.save(todo);
    }
    async delete(id) {
        const todo = await this.todoRepository.findOne({ where: { id } });
        if (!todo) {
            throw new common_1.NotFoundException(`Todo with id ${id} not found`);
        }
        return await this.todoRepository.remove(todo);
    }
    async updateWithImages(id, dto) {
        const todo = await this.todoRepository.findOne({ where: { id }, relations: ['images'] });
        if (!todo) {
            throw new common_1.NotFoundException(`Todo with id ${id} not found`);
        }
        if (!dto.is_active) {
            throw new common_1.BadRequestException('Cannot update to an inactive record.');
        }
        Object.assign(todo, { name: dto.name, email: dto.email, password: dto.password });
        if (dto.images && dto.images.length > 0) {
            const updatedImages = dto.images.map(imagePath => {
                const existingImage = todo.images.find(img => img.path === imagePath);
                if (existingImage) {
                    existingImage.path = imagePath;
                    return existingImage;
                }
                else {
                    return this.imagesRepository.create({
                        user: todo,
                        path: imagePath,
                        is_active: true,
                    });
                }
            });
            await this.imagesRepository.save(updatedImages);
            todo.images = updatedImages;
        }
        return await this.todoRepository.save(todo);
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_entity_1.Todo)),
    __param(1, (0, typeorm_1.InjectRepository)(images_entity_1.Images)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TodosService);
//# sourceMappingURL=todos.service.js.map