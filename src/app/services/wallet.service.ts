import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, finalize, map, mergeMap, reduce, switchMap, tap, firstValueFrom, from, throwError, defaultIfEmpty, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { PocketService } from './pocket.service';
import { Wallet } from '../interfaces/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  userId$!: Observable<string>

  constructor(private http: HttpClient,
    private _authService: AuthenticationService,
    private _pocketService: PocketService) {

    this._authService.getUserId().subscribe(
      response => this.userId$ = response
    )

  }

  url = "http://localhost:3000/wallets/"

  getAll(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(this.url).pipe(
      tap((wallets) => console.log('all wallets without filter: ', wallets)),     
      map((wallets) => wallets.filter((wallet: any) => {
        // Ensure the 'users' array exists and isn't empty
        if (!Array.isArray(wallet.users) || wallet.users.length === 0) {
          return false; // Exclude wallets without a valid 'users' array
        }
        // Check if any user in the wallet's 'users' array matches the current userId
        let wo = wallet.users.some((user: any) => user._id === this.userId$);
        console.log('wallets of the userId: ', wo);
        return wallet.users.some((user: any) => user._id === this.userId$);
        
      })
      ),
      defaultIfEmpty([]), 
      catchError((error) => {
        console.error('Error fetching wallets:', error);
        return of([]); // if error, then returns an empty array too
      })
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
            reduce(() => { }, () => true)
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
      })
  }

  create(wallet: any): Observable<any> {
    return this._authService.getUserId().pipe(
      tap((response: any) => {
        console.log('getting user from the wallet service: ', response);
        this.userId$ = response;  // Aquí es donde asignas el userId$
      }),
      mergeMap(() => {
        const newwallet = { ...wallet, users: [this.userId$] };  // Esperas hasta que userId$ esté relleno
        return this.http.post(this.url, newwallet);
      }),      
      tap((newWallet: any) => console.log("new wallet: ", newWallet)),
      map((newWallet: any) => {
        console.log(newWallet._id);
        return { id: newWallet._id, name: newWallet.name };
      }),
      switchMap(({ id, name }) => {
        const pocket = {
          name: "main pocket of: " + name,
          amount: 0,
          currency: "euro",
          wallet: id
        };
        console.log("ID: ", id);
        return this._pocketService.create(pocket);
      }),
      catchError((error) => {
        if (error.error.message.includes('E11000')) {
          alert("That name is already in use, the new wallets name must be a different one" + "( " + error.error.message + " )");
          return error;
        } else {
          alert('creating a new wallet error: ' + error.error.message);
          return error;
        }
      }),
      finalize(() => console.log("add new wallet and main pocket subscription ended"))
    );
  }



}

