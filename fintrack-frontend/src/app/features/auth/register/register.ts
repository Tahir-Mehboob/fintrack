import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule, FormModule } from '@coreui/angular';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ButtonModule, FormModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  formData: RegisterRequest = {
    fullName: '',
    email: '',
    password: ''
  };

  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.authService.register(this.formData).subscribe({
      next: () => {
        this.loading.set(false);
        this.successMessage.set('Registration successful! Please login.');
        setTimeout(() => this.router.navigate(['/login']), 1200);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.error || 'Registration failed. Please try again.');
      }
    });
  }
}