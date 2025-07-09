import { Injectable } from '@nestjs/common';
import { User } from '../../models/user.model';
import { UserCreateDto } from './dtos/user-create.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private jwtService: JwtService) {}

  findOne(id: number) {
    return User.findOneBy({ id: id });
  }

  findOneOrFail(id: number) {
    return User.findOneByOrFail({ id: id });
  }

  findOneByUsername(username: string) {
    return User.createQueryBuilder()
      .where({ mobile: username })
      .orWhere({ email: username })
      .getOne();
  }

  async create(data: UserCreateDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = data.password
      ? await bcrypt.hash(data.password, salt)
      : '';

    return User.create({
      name: data.name,
      password: hashedPassword,
      email: data.email ?? '',
      mobile: data.mobile ?? '',
      image: data.image ?? '',
      is_guest: data.is_guest ?? false,
    }).save();
  }

  async checkPassword(user: User, password: string) {
    return user.password ? await bcrypt.compare(password, user.password) : true;
  }

  getToken(user: User) {
    const payload = { sub: user.id, username: user.email, name: user.name };
    return this.jwtService.sign(payload);
  }
}
