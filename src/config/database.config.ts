import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { User } from '../users/entities/user.entity';
import { Offer } from '../offers/entities/offer.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { Wishlist } from '../wishlists/entities/wishlist.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<'postgres'>('ORM_TYPE'),
      host: this.configService.get<string>('ORM_HOST'),
      port: Number(this.configService.get<number>('ORM_PORT')),
      username: this.configService.get<string>('ORM_NAME'),
      password: this.configService.get<string>('ORM_PASSWORD'),
      database: this.configService.get<string>('ORM_DATABASE'),
      entities: [User, Offer, Wish, Wishlist],
      synchronize: Boolean(this.configService.get<boolean>('ORM_DATABASE')),
    };
  }
}
