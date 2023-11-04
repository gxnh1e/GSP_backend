import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { createTodoDto } from './dto/createTodo.dto';
import { updateTodoDto } from './dto/updateTodo.dto';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async getAllTodo() {
        return await this.todoService.getAllTodo();
    }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async getTodo(
        @Param(':id') id: number,
    ) {
        return await this.todoService.getTodo(id);
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async createTodo(@Body() createdTodoDto: createTodoDto) {
        return await this.todoService.createTodo(createdTodoDto);
    }

    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async updateTodo(
        @Param(':id') id: number,
        @Body() updateTodoDto: updateTodoDto,
    ) {
        return await this.todoService.updateTodo(id, updateTodoDto);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async deleteTodo(
        @Param(':id') id: number,
    ) {
        return await this.todoService.deleteTodo(id);
    }

    @Put('complete/:id')
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async completeTodo(
        @Param(':id') id: number,
    ) {
        return await this.todoService.completeTodo(id);
    }
}
