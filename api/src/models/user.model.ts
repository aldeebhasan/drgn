import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from './room.model';
import { Activity } from './activities.model';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  mobile?: string = '';

  @Column({ nullable: true })
  password?: string = '';

  @Column({ default: '' })
  image: string = '';

  @Column('boolean')
  is_guest: boolean = false;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Room, (relation) => relation.user)
  rooms: Array<Room>;

  @OneToMany(() => Activity, (relation) => relation.user)
  logs: Array<Activity>;
}
