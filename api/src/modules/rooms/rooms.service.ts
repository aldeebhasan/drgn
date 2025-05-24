import { Injectable } from '@nestjs/common';
import { Room } from '../../models/room.model';
import * as bcrypt from 'bcrypt';

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

  async create(user_id: number, name: string, password: string = '') {
    const salt = await bcrypt.genSalt();
    const hashedPassword = password ? await bcrypt.hash(password, salt) : '';
    return Room.create({
      user: { id: user_id },
      name: name,
      password: hashedPassword,
    });
  }

  async checkPassword(room: Room, password: string) {
    return room.password ? await bcrypt.compare(password, room.password) : true;
  }
}
