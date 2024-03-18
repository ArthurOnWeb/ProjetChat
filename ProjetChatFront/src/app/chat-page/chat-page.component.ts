import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

interface User {
  id: number;
  name: string;
}

interface Message {
  text: string;
  isMine: boolean;
  userId: number; 
}


@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent {
  users: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
  ];

  selectedUser: User | null = null;
  messages: Message[] = [];
  newMessage = '';

  constructor() {}

  selectUser(user: User) {
    this.selectedUser = user;
    
    this.loadMessagesForUser(user.id);
  }

  loadMessagesForUser(userId: number) {
    this.messages = [
      { text: "Comment vas-tu ?", isMine: false, userId: userId },
      { text: "Je vais bien, merci!", isMine: true, userId: userId }
    ];
  }

  sendMessage() {
    if (!this.selectedUser || this.newMessage.trim() === '') {
      return;
    }
    this.messages.push({
      text: this.newMessage,
      isMine: true,
      userId: this.selectedUser.id
    });
    this.newMessage = '';

    
  }
}
