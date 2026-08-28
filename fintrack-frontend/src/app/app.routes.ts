import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { BudgetPage } from './features/budgets/budget-page/budget-page';
import { CategoryPage } from './features/categories/category-page/category-page';
import { Shell } from './core/layout/shell/shell';
import { Profile } from './features/profile/profile/profile';


export const routes: Routes = [
  { path: '', redirectTo: '/login',
     pathMatch: 'full' 
  },

  { path: 'login', component: Login },
  { path: 'register', component: Register },


  {
    path: '',
    component: Shell,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'budgets', component: BudgetPage },
      { path: 'categories', component: CategoryPage },
      { path: 'profile', component: Profile },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];