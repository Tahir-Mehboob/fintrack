import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule, FormModule } from '@coreui/angular';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, FormModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  fullName = signal('');
  email = signal('');
  profileLoading = signal(false);
  profileMessage = signal('');
  profileError = signal('');

  currentPassword = signal('');
  newPassword = signal('');
  passwordLoading = signal(false);
  passwordMessage = signal('');
  passwordError = signal('');

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.fullName.set(data.fullName);
        this.email.set(data.email);
      },
      error: (err) => console.error('Failed to load profile', err)
    });
  }

  onUpdateProfile(): void {
    this.profileLoading.set(true);
    this.profileMessage.set('');
    this.profileError.set('');

    this.userService.updateProfile({ fullName: this.fullName(), email: this.email() }).subscribe({
      next: (updated) => {
        this.profileLoading.set(false);
        this.profileMessage.set('Profile updated successfully');
        this.authService.setCurrentUser(updated); // update sidebar display
      },
      error: (err) => {
        this.profileLoading.set(false);
        this.profileError.set(err.error?.error || 'Failed to update profile');
      }
    });
  }

  onChangePassword(): void {
    this.passwordLoading.set(true);
    this.passwordMessage.set('');
    this.passwordError.set('');

    this.userService.changePassword({
      currentPassword: this.currentPassword(),
      newPassword: this.newPassword()
    }).subscribe({
      next: (res) => {
        this.passwordLoading.set(false);
        this.passwordMessage.set(res.message);
        this.currentPassword.set('');
        this.newPassword.set('');
      },
      error: (err) => {
        this.passwordLoading.set(false);
        this.passwordError.set(err.error?.error || 'Failed to change password');
      }
    });
  }
}