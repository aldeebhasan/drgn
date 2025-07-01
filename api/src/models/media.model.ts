import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MediaTypeEnums } from '../enums/media-type.enums';
import { User } from './user.model';
import { Room } from './room.model';

@Entity()
export class Media extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: MediaTypeEnums;

  @Column({ default: '' })
  name: string = '';

  @Column()
  path: string = '';

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
