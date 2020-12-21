import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  generate(payload: any) {
    return jwt.sign(
      payload,
      this.configService.get<string>('JWT_PRIVATE_KEY'),
      { algorithm: 'RS256', expiresIn: '1d' },
    );
  }
}
