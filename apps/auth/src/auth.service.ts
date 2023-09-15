import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '@app/common';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

    async login(user: UserDocument, response: Response) {
        const tokenPayload: TokenPayload = {
            userId: user._id.toHexString(),
        };

        const expires = new Date();
        expires.setSeconds(expires.getSeconds() + this.configService.get('JWT_EXPIRATION'));

        const token = this.jwtService.sign(tokenPayload, { secret: this.configService.get('JWT_SECRET') });

        response.cookie('Authentication', token, {
            httpOnly: true,
            expires,
        });
    }

    async logout(response: Response) {
      response.clearCookie('Authentication');

      return response.json({
        message: 'Logged out successfully'
      });
    }

}
