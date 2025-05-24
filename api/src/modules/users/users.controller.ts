import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dtos/user-response.dto';
import { UserCreateDto } from './dtos/user-create.dto';
import { UsersService } from './users.service';
import { ResponseDto } from '../../core/dtos/response.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { CustomThrottlerGuard } from './guards/custom-throttler.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
@UseGuards(CustomThrottlerGuard) // Applies to all routes in this controller
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async register(@Body() data: UserCreateDto) {
    const user = await this.userService.create(data);
    const userResponse = plainToInstance(UserResponseDto, user);

    return ResponseDto.success(userResponse);
  }

  @Post('login')
  @Throttle({ default: { limit: 100, ttl: 60000 } })
  async login(@Body() data: UserLoginDto) {
    const user = await this.userService.findOneByUsername(data.username);
    if (!user || !(await this.userService.checkPassword(user, data.password))) {
      throw new BadRequestException(
        'Failed to login! Maybe notfound or wrong password',
      );
    }
    const userResponse = plainToInstance(UserResponseDto, user);

    return ResponseDto.success(userResponse);
  }
}
