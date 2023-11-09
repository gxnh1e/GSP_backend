import {
    Body,
    Controller,
    Get,
    UseGuards,
    Req,
    Res,
    HttpException,
    HttpStatus,
    Post
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/RegisterDto';
import { GoogleGuard } from './guards/google.guard';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private readonly config: ConfigService
    ) { }

    @Post('/register')
    async register(@Res() res: Response, @Body() registerDto: RegisterDto) {
        const accessToken = await this.authService.register(registerDto);

        res.cookie('ACCESS_TOKEN', accessToken);
        res.send(accessToken);
    }

    @Post('/login')
    async login(@Res() res: Response, @Body() loginDto: LoginDto) {
        const accessToken = await this.authService.login(loginDto);

        res.cookie('ACCESS_TOKEN', accessToken);
        res.send(accessToken);
    }

    @Get('/google')
    @UseGuards(GoogleGuard)
    googleAuth() { }

    @Get('/google/callback')
    @UseGuards(GoogleGuard)
    async googleLogin(@Req() req: Request, @Res() res: Response) {
        if (!req.user) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        const front_url = this.config.get('FRONT_URL');

        const accessToken = this.authService.generateAccessToken(req.user);

        res.cookie('ACCESS_TOKEN', accessToken);
        res.redirect(front_url);
    }

    @Get('/logout')
    @UseGuards(GoogleGuard)
    async logout(@Res() res: Response) {
        const front_url = this.config.get('FRONT_URL')

        res.clearCookie('ACCESS_TOKEN');
        res.redirect(front_url);
    }
}