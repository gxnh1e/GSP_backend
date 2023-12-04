import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({
    description: 'title',
  })
  title!: string;

  @ApiProperty({
    description: 'description',
  })
  description!: string;

  @ApiProperty({
    description: 'likes',
    default: 0,
  })
  likes!: number;
}
