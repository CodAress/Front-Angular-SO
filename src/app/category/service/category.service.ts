import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }

  getCategory(id: string): Observable<Category>{
    return this.http.get<Category>(`${environment.apiUrl}/categories/${id}`);
  }
}
