import { Injectable } from '@nestjs/common';
import { Room } from '../../models/room.model';
import * as bcrypt from 'bcrypt';
import { Not } from 'typeorm';

@Injectable()
export class RoomsService {
  findOne(id: number) {
    return Room.findOneBy({ id: id });
  }

  findOneOrFail(id: number) {
    return Room.findOneByOrFail({ id: id });
  }

  findOneByCode(name: string) {
    return Room.findOneBy({ code: name });
  }

  findAll(filters: { user_id?: number; room_id?: number }) {
    return Room.createQueryBuilder('rooms')
      .where((qb) =>
        qb.where({ user: { id: filters.user_id } }).orWhere((qb2) => {
          qb2.where({ user: Not({ id: filters.user_id }), is_public: true });
        }),
      )
      .where({ id: Not(filters.room_id) })
      .innerJoinAndSelect('rooms.user', 'user')
      .limit(50)
      .getMany();
  }

  async create(
    user_id: number,
    name: string,
    code: string,
    password: string = '',
    is_public: boolean = true,
  ) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = password ? await bcrypt.hash(password, salt) : '';
    return Room.create({
      user: { id: user_id },
      name: name,
      code: code,
      password: hashedPassword,
      is_public: is_public,
    }).save();
  }

  async checkPassword(room: Room, password: string) {
    return room.password ? await bcrypt.compare(password, room.password) : true;
  }
}
