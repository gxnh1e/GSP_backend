import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/RegisterDto';
import { validateEmail } from 'src/validation/auth';
import { validatePassword } from 'src/validation/auth';
import * as crypto from 'crypto';
import { LoginDto } from './dto/LoginDto';

function sha256(password: string) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async register({ email, username, password }: RegisterDto): Promise<string> {
        const user = await this.userRepository.findOneBy({ email, username });

        if (user) {
            throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
        }

        if (!validateEmail(email)) {
            throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
        }

        if (!validatePassword(password)) {
            throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
        }

        const newUser = this.userRepository.create({
            email,
            username,
            password: sha256(password),
        });

        await this.userRepository.save(newUser);
        return await this.generateAccessToken(newUser);
    }

    async login({ username, password }: LoginDto): Promise<string> {
        const user = await this.userRepository.findOneBy({ username });

        if (!user) {
            throw new HttpException('Invalid User', HttpStatus.BAD_REQUEST);
        }
        if (sha256(password) !== user.password) {
            throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
        }

        return await this.generateAccessToken(user);
    }

    // async generateGoogleAccessToken(user: Express.User): Promise<string> {
    //     return await this.jwtService.signAsync(
    //         user,
    //         {
    //             secret: this.configService.get('ACCESS_TOKEN_SECRET'),
    //             expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
    //         });
    // }

    async generateAccessToken(user: Express.User): Promise<string> {
        return await this.jwtService.signAsync(
            { username: user.username, email: user.email },
            {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: this.configService.get('JWT_EXPIRES_IN'),
            },
        )
    }
}