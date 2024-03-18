import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  templateUrl: './chat-page.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent {
  messages = [
    { text: "Salut, comment ça va ?", isMine: false },
    { text: "Salut! Bien et toi ?", isMine: true }
  ];

  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }
    this.messages.push({ text: this.newMessage, isMine: true });
    this.newMessage = '';
  }
}

