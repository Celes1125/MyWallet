import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, map, tap } from 'rxjs';
import { Category } from '../interfaces/category';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = "http://localhost:3000/categories/"
  userId!: string
  constructor(private http: HttpClient,
    private _authService: AuthenticationService) {
    this.getUser()
  }

  getUser() {
    this._authService.getUserId().subscribe(
      response => {
        console.log('front response: ', response)
        this.userId = response
      }
    )
  }

  getAll(): Observable<Category[]> | any {
    return this.http.get(this.url).pipe(
      tap((allCategories: any) => console.log(allCategories)),
      map((allCategories: Category[]) => allCategories.filter((category: any) => category.creator._id === this.userId)),
      tap((response: Category[]) => console.log("CATEGORIAS DE CELE: ", response)),
      catchError(error => error),
      finalize(() => console.log("get categories subscription ended"))
    )

  }

  create(category: any): Observable<Category> | any {
    const newCategory = { ...category, creator: this.userId }
    return this.http.post(this.url, newCategory).pipe(
      tap(response => console.log(response)),
      catchError(error => error),
      finalize(() => console.log("post category subscription ended"))
    )
  }

  edit(category: any): Observable<Category> | any {
    const id = category._id
    const url = this.url + id
    return this.http.put(url, category).pipe(
      tap(response => console.log(response)),
      catchError(error => error),
      finalize(() => console.log("put category subscription ended"))
    )
  }

  delete(id: string) {
    return this.http.delete(this.url + id).pipe(
      tap(response => console.log(response)),
      catchError(error => error),
      finalize(() => console.log("delete category subscription ended"))
    )
  }

  getById(id: string) {
    return this.http.get(this.url + id).pipe(
      tap(response => console.log(response)),
      catchError(error => error),
      finalize(() => console.log("get by id category subscription ended"))
    )
  }
  
}



