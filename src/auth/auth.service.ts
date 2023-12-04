import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private userPepository: Repository<User>,
  ) {}

  async getUserProfile(user: Express.User) {
    const { email } = user;
    const _user = await this.userPepository.findOne({ where: { email } });
    if (!_user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async generateAccessToken(user: Express.User): Promise<string> {
    return await this.jwtService.signAsync(
      { user },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN'),
      },
    );
  }

  async saveUser(user: Express.User) {
    const { username, email } = user;
    const _user = await this.userPepository.findOne({ where: { email } });

    if (_user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userPepository.create({
      email,
      username,
    });
    await this.userPepository.save(newUser);
  }
}
