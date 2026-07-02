import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  login(): void {

    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.login(user).subscribe({
      next: (response: any) => {
        this.authService.saveUser(response.user);
        this.message = response.message;
      },
      error: (error: any) => {
        this.message = error.error.message;
      }
    });

  }

}