import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'http://localhost:3000'; // selon URL de backend d arthur

  constructor(private http: HttpClient) { }

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/messages`);
  }

  sendMessage(message: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/messages`, { message });
  }
}
