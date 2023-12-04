import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GoogleGuard } from 'src/auth/guards/google.guard';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('/create')
  @ApiBearerAuth()
  @UseGuards(GoogleGuard)
  createBoard(@Req() req: Request, @Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(req.user, createBoardDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(GoogleGuard)
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  findAll(@Query('page') page: number = 1) {
    return this.boardService.pagenate(page);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(GoogleGuard)
  findBoard(@Param('id') id: string) {
    return this.boardService.find(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(GoogleGuard)
  updateBoard(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.update(req.user, id, updateBoardDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(GoogleGuard)
  removeBoard(@Req() req: Request, @Param('id') id: string) {
    return this.boardService.remove(req.user, id);
  }

  @Get('/like/:id')
  @ApiBearerAuth()
  @UseGuards(GoogleGuard)
  likeBoard(@Param('id') id: string) {
    return this.boardService.like(id);
  }
}
