import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, tap } from 'rxjs';
import { Vendor } from '../interfaces/vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  url = "http://localhost:3000/vendors/"
  constructor( private http:HttpClient) { }

    getAll(): Observable<Vendor[]> | any {
      return this.http.get(this.url).pipe(
        tap(response=>console.log(response)),
        catchError(error=>error),
        finalize(()=>console.log("get vendors subscription ended"))
      )

    }

    create(vendor:any):Observable<Vendor> | any {
      return this.http.post(this.url, vendor).pipe(
        tap(response => console.log(response)),
        catchError(error => error),
        finalize( ()=> console.log("post vendor subscription ended"))
      )
    }

}


