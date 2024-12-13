import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, username } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { username }],
    });

    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с таким email или username уже зарегистрирован',
      );
    }

    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findOne(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { email, username } = updateUserDto;

    const existingUser = await this.userRepository.findOne({
      where: [
        { email, id: Not(id) },
        { username, id: Not(id) },
      ],
    });

    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с таким email или username уже зарегистрирован',
      );
    }

    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne({ where: { id } });
  }

  async removeOne(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
