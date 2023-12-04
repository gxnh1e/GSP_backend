import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleGuard } from './guards/google.guard';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Get('/profile')
  @ApiBearerAuth()
  @UseGuards(GoogleGuard)
  async profile(@Req() req: Request) {
    this.authService.getUserProfile(req.user);
  }
  @Get('/google')
  @UseGuards(GoogleGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleAuth() {}

  @Get('/google/callback')
  @UseGuards(GoogleGuard)
  googleLogin(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const front_url = this.config.get('FRONT_URL');

    const accessToken = this.authService.saveUser(req.user);

    res.cookie('ACCESS_TOKEN', accessToken);
    res.redirect(front_url);
  }

  @Get('/logout')
  @ApiBearerAuth()
  @UseGuards(GoogleGuard)
  logout(@Res() res: Response) {
    const front_url = this.config.get('FRONT_URL');

    res.clearCookie('ACCESS_TOKEN');
    res.redirect(front_url);
  }
}
