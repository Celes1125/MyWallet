import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, finalize, map, tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  userId!: string

  constructor(private http: HttpClient,
    private _authService: AuthenticationService) {
    this.getUser()
  }

  url = "http://localhost:3000/wallets/"

  getUser() {
    this._authService.getUserId().subscribe(
      response => {
        console.log('front response: ', response)
        this.userId = response
      }
    )
  }

  getAll(): Observable<any> {
    return this.http.get(this.url).pipe(
      tap((wallets: any) => console.log('WALLETS RESPONSE: ', wallets)),
      filter( (wallets:any) => wallets.some ((wallet:any) => wallet.creator._id === this.userId)),
      catchError((error) => error),
      finalize(() => console.log('ended walletsList$ subscription'))
    )
  }

  getPocketsOfWallet(id: string | any): Observable<any> {
    return this.http.get(this.url + 'pockets/' + id).pipe(
      tap(console.log),
      catchError(error => error),
      finalize(() => console.log("getPocketsOfWallet subscription ended")),
    )

  }

  getById(id: string): any {
    return this.http.get(this.url + id)
  }

  getActiveWallet(): any {
    return this.getAll().pipe(
      map((wallets) => wallets.filter((wallet: any) => wallet.activated === true)),
      map((filteredWallets) => filteredWallets.length > 0 ? filteredWallets[0] : null),
      tap(console.log),
      catchError(async (error) => console.log(error)),
      //finalize( ()=> console.log("getActiveWallet subscription ended"))
    );
  }

  edit(wallet: any) {
    const id = wallet._id
    const url = this.url + id
    return this.http.put(url, wallet).pipe(
      tap((modifiedWallet) => modifiedWallet),
      catchError(error => error),
      finalize(() => console.log('edit wallet subscription ended'))
    )
  }

  delete(id: string) {
    const url = this.url + id
    return this.http.delete(url).pipe(
      tap((response) => response),
      catchError(error => error),
      finalize(() => console.log('delete wallet subscription ended'))
    )
  }

  create(wallet: any) {
    const newwallet = { ...wallet, creator: this.userId }
    return this.http.post(this.url, newwallet).pipe(
      tap((response) => response),
      catchError(error => error),
      finalize(() => console.log('create wallet subscription ended'))
    )

  }



}