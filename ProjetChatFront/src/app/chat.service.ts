import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/chats'; // Base URL de l'API pour les chats

  constructor(private http: HttpClient) {}

  // Méthode pour envoyer un message
  sendMessage(conversationId: string, messageData: { expediteur: {_id: string, nom: string}, contenu: string, timestamp: string }): Observable<any> {
    const url = `${this.apiUrl}/${conversationId}/messages`;
    return this.http.post(url, messageData);
  }

  // Méthode pour créer une conversation
  createConversation(conversationData: { nom: string, participants: string[] }): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post(url, conversationData);
  }

// Méthode pour vérifier l'existence d'une conversation
verifyConversation(participants: string[]): Observable<any> {
  const url = `${this.apiUrl}/participants`;
  return this.http.post(url, { participants });
}

// Méthode pour récupérer les messages d'une conversation
getMessages(conversationId: string): Observable<any> {
  const url = `${this.apiUrl}/${conversationId}/messages`;
  return this.http.get(url);
}

}