import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}
  async create(
    user: Express.User,
    { title, description, likes }: CreateBoardDto,
  ) {
    const board = await this.boardRepository.create({
      title,
      description,
      likes,
      user,
    });
    await this.boardRepository.save(board);
  }

  async pagenate(page = 1) {
    const take = 6;
    const [boards, total] = await this.boardRepository.findAndCount({
      take,
      skip: (page - 1) * take,
    });
    return {
      boards,
      totalPage: Math.ceil(total / take),
      page,
    };
  }

  async find(id: string) {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) {
      throw new Error('Board not found');
    }
    return board;
  }

  async update(
    user: Express.User,
    id: string,
    { title, description }: UpdateBoardDto,
  ) {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!board) {
      throw new Error('Board not found');
    }

    const { username } = user;
    const boardUsernme = board.user.username;
    if (boardUsernme !== username) {
      throw new Error('User not authorized');
    }

    board.title = title;
    board.description = description;
    await this.boardRepository.save(board);
  }

  async remove(user: Express.User, id: string) {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) {
      throw new Error('Board not found');
    }

    const { username } = user;
    const boardUsernme = board.user.username;
    if (boardUsernme !== username) {
      throw new Error('User not authorized');
    }
    await this.boardRepository.remove(board);
  }

  async like(id: string) {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) {
      throw new Error('Board not found');
    }

    board.likes += 1;
    await this.boardRepository.save(board);
  }
}
