import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from './message.model';
import { User } from './user.model';

@Entity({ name: 'rooms' })
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ default: '' })
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  password: string;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Message, (relation) => relation.room)
  messages: Array<Message>;
}
