import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { ChatService } from '../chat.service';

interface User {
  id: string;
  name: string;
}

interface Message {
  text: string;
  isMine: boolean;
  userId: string; 
}

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  messages: Message[] = [];
  newMessage = '';

  constructor(private userService: UserService, private chatService: ChatService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsersNames().subscribe({
      next: (data) => {
        this.users = data.map((u: any) => ({ id: u._id, name: u.nom }));
      },
      error: (err) => console.error(err),
    });
  }

  selectUser(user: User) {
    this.selectedUser = user;
    // Vous devrez implémenter une méthode pour charger les messages pour un utilisateur sélectionné
    // Cela dépendra de la structure de votre API et des données disponibles
  }

  sendMessage() {
    if (!this.selectedUser || this.newMessage.trim() === '') {
      return;
    }

    const messageData = {
      expediteur: { _id: this.selectedUser.id, nom: this.selectedUser.name },
      contenu: this.newMessage,
      timestamp: new Date().toISOString()
    };

    // Supposons que vous ayez un moyen d'obtenir l'ID de la conversation actuelle
    const conversationId = 'some-conversation-id'; // Ceci est un placeholder

    this.chatService.sendMessage(conversationId, messageData).subscribe({
      next: (response) => {
        console.log('Message sent', response);
        this.messages.push({
          text: this.newMessage,
          isMine: true,
          userId: this.selectedUser.id
        });
        this.newMessage = '';
      },
      error: (err) => console.error('Error sending message:', err)
    });
  }
}
