import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  constructor(private readonly configService: ConfigService) {}

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.configService.get<number>('HASH_SALT'));
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
