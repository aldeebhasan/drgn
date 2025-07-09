// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'node:process';
import { UserPayload } from './types/user-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-socket') {
  constructor() {
    super({
      jwtFromRequest:
        ExtractJwt.fromHeader('authorization') ||
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || '',
    });
  }

  validate(payload: {
    sub?: number;
    username?: string;
    name?: string;
  }): UserPayload {
    return {
      id: payload.sub ?? '',
      email: payload.username ?? '',
      name: payload.name ?? '',
    } as UserPayload;
  }
}
