import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, defaultIfEmpty, filter, finalize, map, of, tap } from 'rxjs';
import { Vendor } from '../interfaces/vendor';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class VendorService {
  url = "http://localhost:3000/vendors/"
  userId!: string

  constructor(
    private http: HttpClient,
    private _authService: AuthenticationService) {
    this.getUser()
  }

  getUser() {
    this._authService.getUserId().subscribe(
      (response: string) => this.userId = response
    )
  }

  getAll(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.url).pipe(
      map((vendors: Vendor[]) => vendors.filter((vendor: Vendor) => vendor.creator._id === this.userId)),
      defaultIfEmpty([]),
      tap((response: Vendor[]) => console.log("filtered vendors: ", response)),      
      catchError((error) => {
        console.log('error: ', error);
        return of([]); 
      }),
      finalize(() => console.log("get vendors subscription ended"))
    )

  }

  create(vendor: any): Observable<Vendor> | any {
    const newVendor = { ...vendor, creator: this.userId }
    return this.http.post(this.url, newVendor).pipe(
      tap(response => console.log(response)),
      catchError((error) => {
        if (error.error.message.includes('E11000')) {
          alert("That name is already in use, the new vendor name must be a different one" + "( " + error.error.message + " )");
          return error;
        } else {
          alert('creating a new vendor error: ' + error.error.message);
          return error;
        }
      }),
      finalize(() => console.log("post vendor subscription ended"))
    )
  }

  edit(vendor: any): Observable<Vendor> | any {
    return this.http.put(this.url + vendor._id, vendor).pipe(
      tap(response => console.log(response)),
      catchError(error => error),
      finalize(() => console.log("edit vendor subscription ended"))
    )
  }

  delete(id: string) {
    return this.http.delete(this.url + id).pipe(
      tap(response => console.log(response)),
      catchError(error => error),
      finalize(() => console.log("delete vendor subscription ended"))
    )
  }
}


