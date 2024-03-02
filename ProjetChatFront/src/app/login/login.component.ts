import { Component } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserService} from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = "";
  password = "";
  errorMessage! : string;
  constructor(private router: Router) {
  }
  //Méthode de connexion
  login(): void {
    this.userService.login(this.username, this.password).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', this.username);
        this.authService.setLoggedIn(true);  
        this.router.navigate(['/home-page']);
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = "Username or password is incorrect";
        console.log(this.errorMessage);
      }
    );
  }
  
}
