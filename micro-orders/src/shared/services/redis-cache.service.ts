import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string) {
    return this.cache.get(key);
  }

  async set(key: string, value: any) {
    await this.cache.set(key, value, { ttl: 1000 });
  }

  async del(key: string) {
    return this.del(key);
  }
}
