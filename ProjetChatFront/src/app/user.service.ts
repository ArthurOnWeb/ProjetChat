import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api';

  public currentUser!:  Observable<any>;

  constructor(private http: HttpClient, private authService: AuthService) {}

  login(username: string, password: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  register(username: string, password: string, confirmPassword: string) {
    return this.http.post(`${this.apiUrl}/createUser`, { username, password, confirmPassword });
  }

  isLogged(){
    const token = localStorage.getItem("token");
    return !! token
  }

  getUsername(){
    const username = localStorage.getItem('username');
    if (this.isLogged()){
      return username;
    }
    else{
      return null
    }
    

  }
}
