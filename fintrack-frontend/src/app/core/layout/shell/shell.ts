import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule, HeaderModule, INavData, SidebarModule } from '@coreui/angular';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-shell',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SidebarModule,
    HeaderModule,
    ButtonModule
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {

   navItems: INavData[] = [
    { name: 'Dashboard', url: '/dashboard', icon: '📊' },
    { name: 'Categories', url: '/categories', icon: '🏷️' },
    { name: 'Budgets', url: '/budgets', icon: '💰' }
  ];
  
   constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
