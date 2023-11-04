import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}