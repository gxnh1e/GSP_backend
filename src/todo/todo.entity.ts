import { User } from "src/auth/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar')
    title!: string;

    @Column('varchar')
    desc: string;
    
    @Column('boolean', { default: false })
    isDone!: boolean;
    
    @ManyToOne(() => User, (user) => user.todos)
    @JoinColumn()
    user: User;
}