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
exports.TodosController = void 0;
const common_1 = require("@nestjs/common");
const todos_service_1 = require("./todos.service");
const create_todo_dto_1 = require("./dto/create-todo.dto");
const common_2 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let TodosController = class TodosController {
    constructor(todosService) {
        this.todosService = todosService;
    }
    async create(dto) {
        const errors = await (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            throw new common_2.BadRequestException(errors);
        }
        const existingTodo = await this.todosService.findByEmail(dto.email);
        if (existingTodo) {
            throw new common_2.BadRequestException('Person with this email already exists.');
        }
        if (!dto.is_active) {
            throw new common_2.BadRequestException('Cannot create an inactive record.');
        }
        if (dto.images && !this.validateImageArray(dto.images)) {
            throw new common_2.BadRequestException('Invalid image format. Supported formats: .png, .jpg, .jpeg');
        }
        return this.todosService.create(dto);
    }
    validateImageArray(images) {
        const allowedExtensions = ['.png', '.jpg', '.jpeg'];
        for (const image of images) {
            const isValidExtension = allowedExtensions.some(ext => image.toLowerCase().endsWith(ext));
            if (!isValidExtension) {
                throw new common_2.BadRequestException(`Invalid image format for image: ${image}. Supported formats: .png, .jpg, .jpeg`);
            }
        }
        return true;
    }
    async findMany() {
        const todosWithImages = await this.todosService.findManyWithImages();
        return todosWithImages;
    }
    update(id, dto) {
        return this.todosService.update(id, dto);
    }
    delete(id) {
        return this.todosService.delete(id);
    }
    updateWithImages(id, dto) {
        return this.todosService.updateWithImages(id, dto);
    }
};
exports.TodosController = TodosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_todo_dto_1.CreateTodoDto]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "findMany", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_todo_dto_1.CreateTodoDto]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)(':id/images'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_todo_dto_1.CreateTodoDto]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "updateWithImages", null);
exports.TodosController = TodosController = __decorate([
    (0, common_1.Controller)('todos'),
    __metadata("design:paramtypes", [todos_service_1.TodosService])
], TodosController);
//# sourceMappingURL=todos.controller.js.map