import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Username of the user',
  })
  @IsString()
  username!: string;

  @ApiProperty({
    description: 'Password of the user',
  })
  @IsString()
  password!: string;
}
