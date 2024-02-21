// src/app/chat/chat.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.chatService.getMessages().subscribe(data => {
      this.messages = data;
    });
  }

  send(): void {
    if (!this.newMessage.trim()) return;
    this.chatService.sendMessage(this.newMessage).subscribe(() => {
      this.newMessage = '';
      this.loadMessages(); // Recharger les messages après envoi
    });
  }
}

