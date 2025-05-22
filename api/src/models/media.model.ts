import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MediaTypeEnums } from '../enums/media-type.enums';

@Entity()
export class Media extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: MediaTypeEnums;

  @Column()
  path?: string = '';

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
