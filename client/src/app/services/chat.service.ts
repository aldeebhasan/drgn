import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../shared/models/message.model';
import { User } from '../shared/models/user.model';
import { Room } from '../shared/models/room.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private readonly url: string = '/chat';
  // private readonly url: string = 'http://localhost:8080/chat';

  constructor() {
    this.socket = io(this.url);
  }

  createRoom(user?: User, room?: Room): void {
    this.socket.emit('create', { user, room });
  }

  joinChat(user?: User, room?: Room): void {
    this.socket.emit('join', { user, room });
  }

  leaveChat(user?: User, room?: Room): void {
    this.socket.emit('leave', { user, room });
    this.clear();
  }

  // Emit "message" event
  sendMessage(message: Message, room?: Room): void {
    this.socket.emit('message', { message, room });
  }

  // Listen for "message" events
  onMessage(): Observable<Message> {
    return new Observable((observer) => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }

  // Listen for "join" events
  onJoin(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('join', (message: string) => observer.next(message));
    });
  }

  onLeave(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('leave', (message: string) => observer.next(message));
    });
  }

  onSuccess(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('success', (data) => observer.next(data));
    });
  }

  // Listen for "error" events
  onError(): Observable<{ message: string, errors: {} }> {
    return new Observable((observer) => {
      this.socket.on('error', (error) => observer.next(error));
    });
  }

  clear(): void {
    this.socket.removeAllListeners()
  }
}
