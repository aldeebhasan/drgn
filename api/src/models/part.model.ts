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
import { Message } from './message.model';
import { PartTypeEnums } from '../enums/part-type.enums';
import { Media } from './media.model';

@Entity({ name: 'parts' })
export class Part extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: PartTypeEnums;

  @Column('text')
  content: string;

  @ManyToOne(() => Message)
  @JoinColumn({ name: 'message_id' })
  message: Message;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  async getContent(): Promise<string | Media | Message | null> {
    if (this.type === PartTypeEnums.MEDIA) {
      return await Media.findOneBy({ id: Number(this.content) });
    } else if (this.type === PartTypeEnums.MESSAGE) {
      return await Message.findOneBy({ id: Number(this.content) });
    } else {
      return this.content;
    }
  }
}
