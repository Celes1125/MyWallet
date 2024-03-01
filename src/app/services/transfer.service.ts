import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, finalize } from 'rxjs';
import { Transfer } from '../interfaces/transfer';

@Injectable({
  providedIn: 'root'
})
export class TransferService { 

  url = "http://localhost:3000/transfers/"
  userId!: string

  constructor(private http: HttpClient,
    private _authService: AuthenticationService) {
    this.getUser()
  }
 

  getUser() {
    this._authService.getUserId().subscribe(
      response => {
        console.log('front response: ', response)
        this.userId = response
      }
    )
  }

  create(transfer: any) : Observable<Transfer> | any {
    const newTransfer = {...transfer, user: this.userId }    
    console.log("NEW TRANSFER: ", newTransfer)
    return this.http.post(this.url, newTransfer).pipe(
      tap(response => console.log("create transfer response: ", response)),
      catchError(error => error),
      finalize(() => console.log("make transfer subscription ended")))
  }

  getAll() : Observable<any> | any {
    return this.http.get(this.url).pipe(
      tap(response => response),
      catchError(error=>error),
      finalize(()=> console.log("get all transfers subscription ok") )
    )

 


 }

}