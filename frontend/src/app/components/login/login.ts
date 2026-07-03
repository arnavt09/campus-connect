import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.login(user).subscribe({
      next: (response: any) => {
        this.authService.saveUser(response.user);
        this.message = response.message;
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        this.message = error.error.message;
      }
    });
  }
}