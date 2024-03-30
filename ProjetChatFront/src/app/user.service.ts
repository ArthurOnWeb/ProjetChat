import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/';

  public currentUser!:  Observable<any>;

  constructor(private http: HttpClient, private authService: AuthService) {}

  login(email: string, motDePasse: string): Observable<any> {
    const authData = {
      email, // Équivalent à "email": email,
      mot_de_passe: motDePasse // Utilisation de snake_case pour la clé, comme côté backend
    };
  
    return this.http.post(`${this.apiUrl}authentification`, authData);
  }
  

  register(email: string, nom: string, motDePasse: string) {
    const utilisateurData = {
      email,    // Equivalent à "email": email,
      nom,      // Equivalent à "nom": nom,
      mot_de_passe: motDePasse,  // Attention à l'utilisation des snake_case pour les clés comme côté backend
    };
    
    return this.http.post(`${this.apiUrl}utilisateurs`, utilisateurData);
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
  getUsersNames(): Observable<any> {
    return this.http.get(`${this.apiUrl}utilisateurs/noms`);
  }
  getIdByName(nom: string): Observable<any> {
    return this.http.post(`${this.apiUrl}utilisateurs/nom`, { nom });
  }
  getEmailByName(nom: string): Observable<any> {
    return this.http.post(`${this.apiUrl}utilisateurs/email`, { nom });
  }  
  getNameByEmail(nom: string): Observable<any> {
    return this.http.post(`${this.apiUrl}utilisateurs/nom-par-email`, { nom });
  }  
  
}
