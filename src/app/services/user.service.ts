import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor ( private httpClient:HttpClient){}

  url = "http://localhost:3000/users/"

  public create(user: any) {
    return this.httpClient.post(this.url, user )   
      
  }     

  public login(email:any, password:any) : Observable<any > {
    return this.httpClient.post(this.url+'login', {email: email, password: password})   
      
  } 
    


}