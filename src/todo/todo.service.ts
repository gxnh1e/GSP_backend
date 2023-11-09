import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { todoDto } from './dto/todo.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async getTodo(user: Express.User): Promise<Todo[]> {
        const username = await this.userRepository.findOneBy({ username: user.username });
        return await this.todoRepository.find({
            where: {
                user: username,
            }
        })
    }

    async createTodo(user: Express.User, {title, desc}: todoDto): Promise<Todo> {
        const username =  await this.userRepository.findOneBy({ username: user.username });
        const newTodo = await this.todoRepository.create({
            title,
            desc,
            user: username,
        });
        return await this.todoRepository.save(newTodo);
    }

    async updateTodo(user:Express.User, { title, desc }: todoDto, id: number) {
        const username =  await this.userRepository.findOneBy({ username: user.username });
        const todo = await this.todoRepository.findOneBy({ id, user: username });

        if (!todo) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        todo.title = title;
        todo.desc = desc;

        return await this.todoRepository.save(todo);
    }

    async deleteTodo(user: Express.User, id: number) {
        const username =  await this.userRepository.findOneBy({ username: user.username });
        const todo = await this.todoRepository.findOneBy({ id, user: username });

        if (!todo) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        return await this.todoRepository.remove(todo);
    }

    async completeTodo(user: Express.User, id: number) {
        const username =  await this.userRepository.findOneBy({ username: user.username });
        const todo = await this.todoRepository.findOneBy({ id, user: username });

        if (!todo) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        todo.isDone = true;

        return await this.todoRepository.save(todo);
    }
}
