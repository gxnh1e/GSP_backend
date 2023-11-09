import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Todo])],
  controllers: [TodoController],
  providers: [
    TodoService
  ]
})
export class TodoModule { }
