import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderModule, SidebarModule, ButtonModule, INavData } from '@coreui/angular';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, SidebarModule, HeaderModule, ButtonModule],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell implements OnInit {
  navItems: INavData[] = [
    { name: 'Dashboard', url: '/dashboard', icon: '📊' },
    { name: 'Categories', url: '/categories', icon: '🏷️' },
    { name: 'Budgets', url: '/budgets', icon: '💰' },
    { name: 'Profile', url: '/profile', icon: '👤' }
  ];

  pageTitle = signal('Dashboard');

  private titleMap: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/categories': 'Categories',
    '/budgets': 'Budgets',
    '/profile': 'Profile'
  };

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn() && !this.authService.currentUser()) {
      this.userService.getProfile().subscribe({
        next: (user) => this.authService.setCurrentUser(user),
        error: (err) => console.error('Failed to load current user', err)
      });
    }

    this.pageTitle.set(this.titleMap[this.router.url] || 'Dashboard');
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e) => {
      this.pageTitle.set(this.titleMap[(e as NavigationEnd).urlAfterRedirects] || 'FinTrack');
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}