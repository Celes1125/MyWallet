import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, map, tap } from 'rxjs';
import { PocketService } from './pocket.service';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  constructor(private http: HttpClient, private _pocketService:PocketService) { }

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
      finalize( ()=> {  
        
        console.log('create movements subscription ended')  
      })
    )
  }

  deleteMovementsByPocket(id:string){
    const url = this.url+"byPocketId/"+id
    return this.http.delete(url).pipe(
      tap( response => response),
      catchError(error => error),
      finalize( ()=> console.log('delete movements by pocket subscription ended'))

    )
  }
}
