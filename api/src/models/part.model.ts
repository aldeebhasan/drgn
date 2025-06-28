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
import { Inject } from '@nestjs/common';
import { MessagesService } from '../modules/messages/messages.service';

@Entity({ name: 'parts' })
export class Part extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: PartTypeEnums;

  @Column('text')
  content: string;

  formatted_content: any;

  @ManyToOne(() => Message)
  @JoinColumn({ name: 'message_id' })
  message: Message;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  async getContent(
    messageService: MessagesService,
  ): Promise<string | Media | Message | null> {
    if (this.type === PartTypeEnums.MEDIA) {
      return await Media.findOneBy({ id: Number(this.content) });
    } else if (this.type === PartTypeEnums.MESSAGE) {
      return await messageService.findOne(Number(this.content));
    } else {
      return this.content;
    }
  }
}
