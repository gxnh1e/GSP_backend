import { Board } from 'src/board/entities/board.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  email: string;

  @Column()
  username: string;

  @OneToMany(() => Board, (board) => board.user)
  boards: Board;
}
