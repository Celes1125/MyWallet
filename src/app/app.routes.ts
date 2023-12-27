import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './guardians/auth.guard';
import { noop } from 'rxjs';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  
    { path: 'dashboard', component: DashboardComponent, canActivate:[authGuard] },
    { path: 'login', component: LoginComponent},    
    { path: 'signup', component: SignupComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, 
    { path: 'home', component: HomeComponent, canActivate: [authGuard]},   
    { path:'**', component: NotFoundComponent},
    
    

];
