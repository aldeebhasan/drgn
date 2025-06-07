import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserCreateDto } from './dtos/user-create.dto';
import { UsersService } from './users.service';
import { ResponseDto } from '../../core/dtos/response.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { CustomThrottlerGuard } from './guards/custom-throttler.guard';
import { Throttle } from '@nestjs/throttler';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { GuestCreateDto } from './dtos/guest-create.dto';

@Controller('auth')
@UseGuards(CustomThrottlerGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async register(@Body() data: UserCreateDto) {
    const user = await this.userService.create(data);
    const token = this.userService.getToken(user);
    const authResponse = plainToInstance(AuthResponseDto, {
      user: user,
      token: token,
    });

    return ResponseDto.success(authResponse);
  }

  @Post('register-as-guest')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async guestRegister(@Body() data: GuestCreateDto) {
    const guestData = plainToInstance(UserCreateDto, {
      name: data.name,
      email: 'G' + Math.ceil(Math.random() * 1000000) + '@drgn.com',
      is_guest: true,
    });
    const user = await this.userService.create(guestData);
    const token = this.userService.getToken(user);
    const authResponse = plainToInstance(AuthResponseDto, {
      user: user,
      token: token,
    });

    return ResponseDto.success(authResponse);
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
    const token = this.userService.getToken(user);
    const authResponse = plainToInstance(AuthResponseDto, {
      user: user,
      token: token,
    });

    return ResponseDto.success(authResponse);
  }
}
