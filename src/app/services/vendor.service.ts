import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, concatMap, defaultIfEmpty, filter, finalize, map, of, tap, throwError } from 'rxjs';
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

  // get all not deleted vendors of the user
  getAll(): Observable<Vendor[]> {
    return this._authService.getUserId().pipe(
      concatMap((userId) => {
        return this.http.get<Vendor[]>(this.url + 'notDeleted/' + userId)
      }),
      //If empty, returns an empty array
      defaultIfEmpty([]),
      // error manage
      catchError((error) => {
        console.log('error: ', error);
        return of([]); // if error, then returns an empty array too
      }),
      // finalize actions
      finalize(() => console.log("get vendors subscription ended"))
    );
  }

  create(vendor: any): Observable<Vendor> | any {
    const newVendor = { ...vendor, creator: this.userId }
    return this.http.post(this.url, newVendor).pipe(
      tap(response => console.log("Create vendor response: ", response)),
      catchError((error) => {
        console.error("Error in create vendor:", error);
        return throwError(() => error); // Lanza el error para que sea capturado en la suscripción
      }),
      finalize(() => console.log("Create vendor subscription ended"))
    );
  }

  edit(vendor: any): Observable<Vendor> | any {
    return this.http.put(this.url + vendor._id, vendor).pipe(
      tap(response => console.log(response)),
      catchError(error => error),
      finalize(() => console.log("edit vendor subscription ended"))
    )
  }

  // logic delete of the vendor
  delete(id: string) {
    return this.http.patch(this.url + id, {}).pipe(
      tap(response => console.log(response)),
      catchError(error => error),
      finalize(() => console.log("delete vendor subscription ended"))
    )
  }
}


