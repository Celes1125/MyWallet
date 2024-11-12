import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, finalize, of, tap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  localStorage!: Storage

  constructor(
    private httpClient: HttpClient
  ) { }

  url = "https://losportafoglio.onrender.com/users/"

  //create user
  public create(user: User) {
    return this.httpClient.post(this.url, user).pipe(
      tap(response => console.log('create user ok: ')),
      catchError(error => error),
      finalize(() => { console.log('create user subscription ended'); })
    );

  }

  //login
  public login(email: string, password: string): Observable<any> {
    return this.httpClient.post(this.url + 'login', { email: email, password: password })
  }
}