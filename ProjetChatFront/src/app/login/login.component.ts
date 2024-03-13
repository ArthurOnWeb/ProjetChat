import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
  
})
export class LoginComponent {
  
  username = "";
  password = "";
  errorMessage! : string;

constructor(private userService: UserService, private router: Router, private authService: AuthService) {}
  

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
