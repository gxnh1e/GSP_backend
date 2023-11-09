import { Todo } from 'src/todo/todo.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  @JoinColumn()
  todos: Todo[];
}
