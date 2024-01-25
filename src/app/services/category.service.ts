import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, tap } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = "http://localhost:3000/categories/"
  constructor( private http:HttpClient) { }

    getAll(): Observable<Category[]> | any {
      return this.http.get(this.url).pipe(
        tap(response=>console.log(response)),
        catchError(error=>error),
        finalize(()=>console.log("get categories subscription ended"))
      )

    }

    create(category:any):Observable<Category> | any {
      return this.http.post(this.url, category).pipe(
        tap(response=>console.log(response)),
        catchError(error=>error),
        finalize(()=>console.log("post category subscription ended"))
      )
    }

}

