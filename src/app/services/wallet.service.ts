import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http:HttpClient) {}
  
  url = "http://localhost:3000/wallets/"

  getAll (): Observable<any >  {
    return this.http.get(this.url)
  }

  getPocketsOfWallet (id : string) : Observable <any> {
    return this.http.get(this.url+'pockets/'+id )

  }
}
