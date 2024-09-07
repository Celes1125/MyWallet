import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, finalize, tap } from 'rxjs';
import { Vendor } from '../interfaces/vendor';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  url = "http://localhost:3000/vendors/"
  userId!:string
  constructor( private http:HttpClient, 
               private _authService:AuthenticationService) {
                this.getUser()
                }

    getUser(){
      this._authService.getUserId().subscribe(
        (        response: string) => this.userId = response
      )
    }

    getAll(): Observable<Vendor[]> | any {
      return this.http.get(this.url).pipe(
        tap((response: any)=>console.log(response)),
        filter((vendors: any) => vendors.some((vendor:any) => vendor.creator._id === this.userId)),
        catchError(error=>error),
        finalize(()=>console.log("get vendors subscription ended"))
      )

    }

    create(vendor:any):Observable<Vendor> | any {
      const newVendor = { ...vendor, creator: this.userId}
      return this.http.post(this.url, newVendor).pipe(
        tap(response => console.log(response)),
        catchError(error => error),
        finalize( ()=> console.log("post vendor subscription ended"))
      )
    }

    edit(vendor:any):Observable<Vendor> | any {
      return this.http.put(this.url+vendor._id, vendor).pipe(
        tap(response => console.log(response)),
        catchError(error => error),
        finalize( ()=> console.log("edit vendor subscription ended"))
      )
    }

    delete(id:string){
      return this.http.delete(this.url+id).pipe(
        tap(response => console.log(response)),
        catchError(error => error),
        finalize( ()=> console.log("delete vendor subscription ended"))
      )
    }
}


