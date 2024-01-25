import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, finalize, tap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private httpClient: HttpClient) { }

  url = "http://localhost:3000/users/"

  public create(user: User) {
    return this.httpClient.post(this.url, user).pipe(
      tap(response => console.log('create user ok: ', response)),
      catchError(error => error),
      finalize(() => { console.log('create user subscription ended'); })
    );

  }

  public login(email: string, password: string): Observable<any> {
    return this.httpClient.post(this.url + 'login', { email: email, password: password })

  }



}