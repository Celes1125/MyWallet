import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, map, tap } from 'rxjs';
import { Pocket } from '../interfaces/pocket';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/wallets/"

  getAll(): Observable<any> {
    return this.http.get(this.url).pipe(
      tap((wallets: any) => {
        console.log('WALLETS RESPONSE: ', wallets)
      }), catchError((error) => error)
      , finalize(() => {
        console.log('ended walletsList$ subscription')
      })
    )
  }

  getPocketsOfWallet(id: string): Observable<any>{
    return this.http.get(this.url + 'pockets/' + id).pipe(
      tap(console.log),
      catchError(error=> error),
      finalize(() => console.log("getPocketsOfWallet subscription ended")),
    )

  }

  getById(id: string) {
    return this.http.get(this.url + id)
  }

  getActiveWallet() {
    return this.getAll().pipe(
      map((wallets) => wallets.filter((wallet: any) => wallet.activated === true)),
      map((filteredWallets) => filteredWallets.length > 0 ? filteredWallets[0] : null),
      tap(console.log),
      catchError(async (error) => console.log(error)),
      //finalize( ()=> console.log("getActiveWallet subscription ended"))
    );
  }


}