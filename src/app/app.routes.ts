import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guardians/auth.guard';
import { NotFoundComponent } from './components/main/not-found/not-found.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';


export const routes: Routes = [
    
    { path: 'dashboard', component: DashboardComponent, canActivate:[authGuard] },
    { path: 'login', component: LoginPageComponent},  
    { path: '', redirectTo: 'login', pathMatch: 'full' },      
    { path:'**', component: NotFoundComponent},// acordarse de meterle el lazy loading, pasa que aun no lo entiendo...


];
