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
    async register(@Body() registerDto: RegisterDto) {
        const accessToken = this.authService.register(registerDto);

        return accessToken;
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        const accessToken = this.authService.login(loginDto);

        return accessToken;
    }

    @Get('/google')
    @UseGuards(GoogleGuard)
    googleAuth() {}

    @Get('/google/callback')
    @UseGuards(GoogleGuard)
    async googleLogin(@Req() req: Request, @Res() res: Response) {
        if (!req.user) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        const front_url = this.config.get('FRONT_URL_2')

        const accessToken = this.authService.generateAccessToken(req.user);
        
        res.cookie('ACCESS_TOKEN', accessToken);
        res.redirect(front_url);
    }
    @Get('/logout')
    @UseGuards(GoogleGuard)
    async logout(@Req() req: Request, @Res() res: Response) {
        const front_url = this.config.get('FRONT_URL')

        console.log('logout')
        res.clearCookie('ACCESS_TOKEN');
        res.redirect(front_url);
    }
}