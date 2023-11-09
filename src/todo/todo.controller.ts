import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { todoDto } from './dto/todo.dto';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async getAllTodo(@Req() req: Request, @Res() res: Response) {
        res.send(await this.todoService.getTodo(req.user));
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async createTodo(@Req() req:Request, @Body() todoDto: todoDto) {
        return await this.todoService.createTodo(req.user, todoDto);
    }

    @Post(':id')
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async updateTodo(@Req() req:Request, @Param(':id') id: number, @Body() todoDto: todoDto) {
        return await this.todoService.updateTodo(req.user, todoDto, id);
    }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async deleteTodo(@Req() req: Request, @Param(':id') id: number) {
        return await this.todoService.deleteTodo(req.user, id);
    }

    @Get('complete/:id')
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async completeTodo(@Req() req:Request, @Param(':id') id: number,) {
        return await this.todoService.completeTodo(req.user, id);
    }
}
