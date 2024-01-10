import { Observable, catchError, finalize, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';



@Injectable({
  providedIn: 'root'
})
export class PocketService {
  
  
  constructor(private http:HttpClient) {}
  
  url = "http://localhost:3000/pockets/"

  getAll (): Observable<any >  {
    return this.http.get(this.url)
  }

  delete (id:string) : Observable <void> {
    const url = this.url+id
    return this.http.delete<void>(url)
    
  }

  edit (id:string, pocket:any) : Observable <any> {
    const url = this.url+id
    return this.http.put<any>(url, pocket)
  }

  getById (id:string) : Observable<any>{
    const url = this.url+id
    return this.http.get(url)
  }

  create (pocket:any) : Observable<any> {
    return this.http.post(this.url, pocket)
  } 

  


}
