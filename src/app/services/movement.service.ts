import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/movements/"

  getAll(){
    return this.http.get(this.url).pipe(
      tap( response => console.log(response)),
      catchError(error => error),
      finalize( ()=> console.log('get movements subscription ended'))
    )
  }

  create(movement:any){
    return this.http.post(this.url, movement).pipe(
      tap( response => response),
      catchError(error => error),
      finalize( ()=> console.log('create movements subscription ended'))
    )
  }
}
