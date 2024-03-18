import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChatPageComponent } from './chat-page/chat-page.component';

export const routes: Routes = [
    
    {path : 'login', component: LoginComponent},
    {path : 'sign-up', component: SignUpComponent},
    {path : 'chat-page', component: ChatPageComponent},
    {path: '', redirectTo: 'login', pathMatch:'full'},
];
