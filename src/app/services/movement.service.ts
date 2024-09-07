import { Movement } from './../interfaces/movement';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, map, tap, switchMap, of, Observable, filter } from 'rxjs';
import { PocketService } from './pocket.service';
import { Pocket } from '../interfaces/pocket';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MovementService {
  income: any;
  userId!:string;
  url = "http://localhost:3000/movements/"

  constructor(private http: HttpClient, 
              private _pocketService: PocketService,
              private _authService: AuthenticationService) {
                this.getUser()
               }

  getUser(){
    this._authService.getUserId().subscribe(
      (      response: string) => this.userId = response
    )
  }

  getAll(): Observable<any> {
    return this.http.get<Movement[]>(this.url).pipe(
      // Filter movements based on userId      
      filter((movements: Movement[]) => movements.some(movement => movement.user._id === this.userId)),
      // Tap the filtered movements for logging
      tap((filteredMovements: any) => console.log("MOVEMENTS DE CELE: ", filteredMovements)),
      // Catch and handle errors (optional: provide meaningful logging or UI feedback)
      catchError(error => error),
      // Finalize with a message (optional)
      finalize(() => console.log('get movements subscription ended'))
    );
  } 

  create(movement: any) : Observable<any> {
    const newMovement = {...movement, user:this.userId}
    return this.http.post(this.url, newMovement).pipe(
      tap(response => response),
      catchError(error => error),
      finalize(() => {
        console.log('create movements subscription ended')
      })
    )
  }

  addIncomeOrExpense(movement: any) {
    return this.create(movement).pipe(
      tap((createdMovement) => console.log('created movement: ', createdMovement)),
      switchMap(() => this._pocketService.getById(movement.pocket._id)),
      map((pocket: Pocket) => {
        const amount = pocket.amount;
        return amount
      }),
      catchError(error => {
        console.error('Error al obtener el bolsillo:', error);
        return of(null)
      }),     
      map((amount:any) => {
        if (amount !== null && amount !== undefined) {  // Añade esta comprobación
          const newAmount = (movement.type === 'in') ? amount + movement.amount : amount-movement.amount;
          return { amount, newAmount };
        } else {
          // Manejar el caso en que amount es null (por ejemplo, lanzar un error o devolver un valor predeterminado)
          return { amount: null, newAmount: null }; // Ejemplo de retorno con valores nulos
        }
      }),      
      switchMap(({ newAmount }) => {
        return this._pocketService.edit({
          _id: movement.pocket._id,
          amount: newAmount,
          lastModified: new Date()
        });
      }),
      catchError(error => error)
    )

  }

  deleteMovementsByPocket(id: string) {
    const url = this.url + "byPocketId/" + id
    return this.http.delete(url).pipe(
      tap(response => response),
      catchError(error => error),
      finalize(() => console.log('delete movements by pocket subscription ended'))

    )
  }

  deleteMovementsByUser(){
    let id = this.userId
    const url = this.url + "byUserId/" + id
    return this.http.delete(url).pipe(
      tap(response => response),
      catchError(error => error),
      finalize(() => console.log('delete movements by user subscription ended'))

    )
  }

  edit(movement: any): Observable<any> {
    const url = this.url + movement._id
    return this.http.put<any>(url, movement)
  }
}
