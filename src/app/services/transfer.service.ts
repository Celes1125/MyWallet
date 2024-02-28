import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, finalize } from 'rxjs';
import { Transfer } from '../interfaces/transfer';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  userId!: string

  constructor(private http: HttpClient,
    private _authService: AuthenticationService) { }

  url = "http://localhost:3000/transfers/"

  create(transfer: any): Observable<Transfer> | any {
    const newTransfer = { ...transfer, user: { _id: this.userId } }
    return this.http.post(this.url, newTransfer).pipe(
      tap(response => console.log(" make transfer response: ", response)),
      catchError(error => error),
      finalize(() => console.log("create pocket subscription ended")))
  }
}

