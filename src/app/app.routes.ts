import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login-page.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    {
      path: '',
      loadComponent: () => import('./pages/dashboard/dashboard-page.component')
        .then(m => m.DashboardPageComponent),
      canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '' }
  ]