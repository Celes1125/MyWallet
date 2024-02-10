import { Observable, catchError, finalize, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pocket } from '../interfaces/pocket';

@Injectable({
  providedIn: 'root'
})
export class PocketService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/pockets/"

  getAll(): Observable<any> {
    return this.http.get(this.url)
  }

  delete(id: string) {
    const url = this.url + id
    return this.http.delete(url).pipe(
      tap((response) => console.log(url, id)),
      catchError(async (error) => console.log(error)),
      finalize(() => console.log("deletePocket subscription ended")),
    )

  }

  edit(pocket: any): Observable<any> {
    const url = this.url + pocket._id
    return this.http.put<any>(url, pocket)
  }

  getById(id: string): Observable<any> {
    const url = this.url + id
    return this.http.get(url).pipe(
      tap(response => console.log("pocket response: ", response)),
      catchError(error => error),
      finalize(() => console.log("pocket subscription ended"))
    )
  }

  create(pocket: any) : Observable <Pocket> | any {
    return this.http.post(this.url, pocket).pipe(
      tap(response => console.log(" create pocket response: ", response)),
      catchError(error => error),
      finalize(() => console.log("create pocket subscription ended")))
  }

  deleteAll(){
    return this.http.delete(this.url).pipe(
      tap(response => console.log(" create pocket response: ", response)),
      catchError(error => error),
      finalize(() => console.log("create pocket subscription ended")))
  }

}
