import { Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { authGuard } from './guardians/auth.guard';
import { NotFoundComponent } from './components/main/not-found/not-found.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';


export const routes: Routes = [
    
    { path: 'dashboard', component: DashboardComponent, canActivate:[authGuard] },
    { path: 'login', component: LoginPageComponent},  
    { path: '', redirectTo: 'login', pathMatch: 'full' },      
    { path:'**', component: NotFoundComponent},// remember apply lazy loading when understand it

];
