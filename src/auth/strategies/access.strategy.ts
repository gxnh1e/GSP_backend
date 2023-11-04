import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/@types/jwt';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
    constructor(
        public readonly config: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('JWT_SECRET'),
            ignoreExpiration: false,
            passReqToCallback: true,
        });
    }   

    async validate(user: Express.User & Partial<JwtPayload>) {
        delete user.iat;
        delete user.exp;
        return user;
    }
}
