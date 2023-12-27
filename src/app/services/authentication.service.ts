import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient,
    private userService: UserService) { }

    login(email: any, password: any): Observable<{ response: any }> {
      return this.userService.login(email, password)      
    }

    isLogged(){
      return !!localStorage.getItem('token')
    }

}
