import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, finalize, from, map, mergeMap, of, reduce, switchMap, tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { PocketService } from './pocket.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  userId!: string

  constructor(private http: HttpClient,
    private _authService: AuthenticationService,
    private _pocketService: PocketService) {
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
  
      // Filter wallets where at least one user ID in the 'users' array matches the current user ID
      filter((wallets: any) =>
        wallets.some((wallet: any) => {
          // Ensure the 'users' array exists and isn't empty before accessing elements
          if (!Array.isArray(wallet.users) || wallet.users.length === 0) {
            return false; // Exclude wallets without a valid 'users' array
          }
  
          return wallet.users.some((user:any) => user._id === this.userId); // Check for user ID match
        })),
  
      catchError((error) => error),
      finalize(() => console.log('ended walletsList$ subscription'))
    );
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
      this.getPocketsOfWallet(id)
      .pipe(
        // SwitchMap to delete each pocket and emit completion signal
        switchMap(pockets =>
          from(pockets).pipe(
            // MergeMap to handle concurrent pocket deletions
            mergeMap((pocket: any) => this._pocketService.delete(pocket._id)),
            // Reduce to wait for all pocket deletions to complete
            reduce(() => {}, () => true)
          )
        )
      ).subscribe(() => {
        // Pockets deleted, proceed to delete the wallet
        const url = this.url + id
        return this.http.delete(url).pipe(
          tap((response) => response),
          catchError(error => error),
          finalize(() => console.log('delete wallet subscription ended'))
        ).subscribe(response => response)
  })}     
  
  create(wallet: any): Observable<any>{
    const newwallet = { ...wallet, users: [this.userId] }
    return this.http.post(this.url, newwallet).pipe(
      tap((newWallet: any) => console.log("new wallet: ", newWallet)),
      map((newWallet: any) => {
        console.log(newWallet._id)
        return {id: newWallet._id, name: newWallet.name}        

      }),
           
      //tap( (id) => console.log("id: ", id)),            
      switchMap(({id, name}) => {
        const pocket = {
          name: "main pocket of: "+name,
          amount: 0,
          currency: "euro",          
          wallet: id
        }
        console.log("ID: ", id)
        return this._pocketService.create(pocket);
      }),
      catchError(error => {
        console.error('Error al crear el bolsillo:', error);
        return of(null)
      }),  
      finalize( ()=> console.log("add new wallet and main pocket suscription ended"))    
    )





  }

}
/*
getActiveWallet(): any {
  return this.getAll().pipe(
    map((wallets) => wallets.filter((wallet: any) => wallet.activated === true)),
    map((filteredWallets) => filteredWallets.length > 0 ? filteredWallets[0] : null),
    tap(console.log),
    catchError(async (error) => console.log(error)),
    //finalize( ()=> console.log("getActiveWallet subscription ended"))
  );
}*/