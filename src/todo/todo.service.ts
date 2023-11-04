import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { createTodoDto } from './dto/createTodo.dto';
import { updateTodoDto } from './dto/updateTodo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    ) { }

    async getAllTodo() {
        return await this.todoRepository.find();
    }

    async getTodo(id: number) {
        const todo = await this.todoRepository.findOneBy({ id });
        if (!todo) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return todo;
    }

    async createTodo(createTodoDto: createTodoDto) {
        return await this.todoRepository.save(createTodoDto);
    }

    async updateTodo(id: number, { title, desc }: updateTodoDto) {
        const todo = await this.todoRepository.findOneBy({ id });
        
        if (!todo) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        todo.title = title;
        todo.desc = desc;

        return await this.todoRepository.save(todo);
    }

    async deleteTodo(id: number) {
        const todo = await this.todoRepository.findOneBy({ id });

        if (!todo) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        
        return await this.todoRepository.remove(todo);
    }

    async completeTodo(id: number) {
        const todo = await this.todoRepository.findOneBy({ id });

        if (!todo) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        
        todo.isDone = true;
        
        return await this.todoRepository.save(todo);
    }
}
