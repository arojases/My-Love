import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { dashboardResolver } from './guards/dashboard.resolver';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    resolve: {
      hydrated: dashboardResolver
    },
    component: DashboardComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
