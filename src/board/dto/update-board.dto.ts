import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardDto {
  @ApiProperty({
    description: 'title',
  })
  title!: string;

  @ApiProperty({
    description: 'description',
  })
  description!: string;
}
