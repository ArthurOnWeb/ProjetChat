import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  username ="";
  password = "";
  confirmPassword ="";
  errorMessage ="";

  constructor(private userService: UserService, private router: Router, private authService :AuthService){}



  register(){

    this.errorMessage = "";
    this.userService.register(this.username, this.password, this.confirmPassword)
      .subscribe(
        (response: any) => {
          console.log('User registered successfully');
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', this.username);
          this.authService.setLoggedIn(true);  // Met à jour l'état de connexion
          this.router.navigate(['/home-page']);
        },
        (error) => {
          console.log("Username : ",this.username)
          console.log("Password : ", this.password)
          console.error('Registration failed:', error);
          if(this.username==="" || this.password==="" || this.confirmPassword===""){
            this.errorMessage = "You must fill all input"
          }
          else{
            this.errorMessage = error.error.error;
          }
          
          
        }
      );
  }
}

