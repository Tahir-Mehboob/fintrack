import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule, FormModule } from '@coreui/angular';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { LoginRequest } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ButtonModule, FormModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  formData: LoginRequest = { email: '', password: '' };
  loading = signal(false);
  errorMessage = signal('');

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.login(this.formData).subscribe({
      next: () => {
        this.userService.getProfile().subscribe({
          next: (user) => {
            this.authService.setCurrentUser(user);
            this.loading.set(false);
            this.router.navigate(['/dashboard']);
          },
          error: () => {
            this.loading.set(false);
            this.router.navigate(['/dashboard']);
          }
        });
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.error || 'Invalid email or password');
      }
    });
  }
}