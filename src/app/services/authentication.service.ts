import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable, catchError, finalize, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  

  constructor(private httpClient: HttpClient,
    private userService: UserService) { }

  login(email: string, password: string): Observable<{ response: any }> {
    return this.userService.login(email, password).pipe(
      tap((response: any) => {
        if (response && response.token) {
          console.log('Inicio de sesión exitoso');
          //sending token to local storage
          localStorage.setItem('token', response.token);

        } else {
          console.error('non valid format: ');
        }
      }),
      catchError(error => {
        alert('ERROR: ' + error);
        return of(null);
      }),
      finalize(() => {
        console.log('Authentication subscription ended');
      })
    );
  }

  isLogged() {
    return !!localStorage.getItem('token')
  }

  getUserId(){
    const token = localStorage.getItem('token');    
    return this.httpClient.get('http://localhost:3000/users/token/'+token).pipe(
      tap((response: any) => {
        console.log('userId: ', response);
        console.log('http://localhost:3000/users/token/'+token)
        return response
      }),
      catchError(error => {
        alert('ERROR: ' + error);
        return of(null);
      }),
      finalize(() => {
        console.log('getUserId subscription ended');
      })
    );

  }

  

}
