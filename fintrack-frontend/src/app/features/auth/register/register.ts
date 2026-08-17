import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ButtonModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { NotificationService } from '@progress/kendo-angular-notification';

import { RegisterRequest } from '../../../models/user.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink, ButtonModule, InputsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  
  formData: RegisterRequest = {
    fullName: '',
    email: '',
    password: ''
  };

  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.formData).subscribe({
      next: () => {
        this.loading = false;
        this.notificationService.show({
          content: 'Registration successful! Please login.',
          type: { style: 'success', icon: true },
          position: { horizontal: 'center', vertical: 'top' }
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.error || 'Registration failed. Please try again.';
      }
    });
  }

}
