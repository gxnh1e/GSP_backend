import { Injectable } from '@nestjs/common';
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

  async saveUser(user: Express.User) {
    const { username, email } = user;
    const _user = await this.userPepository.findOne({ where: { email } });

    if (_user) {
      throw new Error('User already exists');
    }

    const newUser = await this.userPepository.create({ username, email });
    await this.userPepository.save(newUser);
  }

  async getUserProfile(user: Express.User) {
    const { email } = user;
    const _user = await this.userPepository.findOne({ where: { email } });
    if (!_user) {
      throw new Error('User not found');
    }

    return user;
  }

  async generateAccessToken(user: Express.User): Promise<string> {
    await this.saveUser(user);
    return await this.jwtService.signAsync(
      { user },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN'),
      },
    );
  }
}
