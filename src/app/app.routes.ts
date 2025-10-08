import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/login/login-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PasswordResetPageComponent } from './features/password-reset/password-reset-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'password-reset/:token', component: PasswordResetPageComponent },
  {
    path: '',
    loadComponent: () => import('./features/dashboard/dashboard-page.component')
      .then(m => m.DashboardPageComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
]