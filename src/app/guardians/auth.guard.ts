
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router: Router = new Router; 
  const authService = inject(AuthenticationService)  

  if(authService.isLogged()){
    return true
  }else{
    router.navigateByUrl('/login')
    return false
  }
  
};
