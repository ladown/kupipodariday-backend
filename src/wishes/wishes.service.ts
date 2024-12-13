import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto, owner: User): Promise<Wish> {
    const newWish = this.wishRepository.create({
      ...createWishDto,
      owner: { id: owner.id },
    });
    return await this.wishRepository.save(newWish);
  }

  async findOne(id: number): Promise<Wish | undefined> {
    return await this.wishRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        offers: {
          user: true,
        },
      },
    });
  }

  async updateOne(
    id: number,
    updateWishDto: UpdateWishDto,
    user: User,
  ): Promise<Wish> {
    const wish = await this.findOne(id);

    if (wish.owner.id !== user.id) {
      throw new BadRequestException('Недостаточно прав для редактирования');
    }

    await this.wishRepository.update(id, updateWishDto);
    return await this.wishRepository.findOne({ where: { id } });
  }

  async removeOne(id: number, user: User): Promise<Wish> {
    const wish = await this.findOne(id);

    if (wish.owner.id !== user.id) {
      throw new BadRequestException('Недостаточно прав для удаления');
    }

    await this.wishRepository.delete(id);

    return wish;
  }
}
