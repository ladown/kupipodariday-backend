import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';

import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { PasswordInterceptor } from '../interceptors/password.interceptor';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseInterceptors(PasswordInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: { user: User }, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto, req.user);
  }

  @UseInterceptors(PasswordInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @UseInterceptors(PasswordInterceptor)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
    @Req() req: { user: User },
  ) {
    return this.wishesService.updateOne(+id, updateWishDto, req.user);
  }

  @UseInterceptors(PasswordInterceptor)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeOne(@Req() req: { user: User }, @Param('id') id: string) {
    return this.wishesService.removeOne(+id, req.user);
  }

  @UseInterceptors(PasswordInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.wishesService.findAll();
  }

  @Get('/last')
  findLastWishes() {
    return this.wishesService.findLastWishes();
  }

  @Get('/top')
  findTopWishes() {
    return this.wishesService.findTopWishes();
  }

  @UseInterceptors(PasswordInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post(':id/copy')
  copyWish(@Param('id') id: string, @Req() req: { user: User }) {
    return this.wishesService.copyWish(+id, req.user);
  }
}
