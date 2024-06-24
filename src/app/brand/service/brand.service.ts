import { Injectable } from '@angular/core';
import { Brand } from '../model/brand';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getBrands(): Observable<Brand[]>{
    return this.http.get<Brand[]>(`${environment.apiUrl}/brands`);
  }

  getBrand(id: string): Observable<Brand>{
    return this.http.get<Brand>(`${environment.apiUrl}/brands/${id}`);
  }

  createBrand(brand: Brand): Observable<Brand>{
    return this.http.post<Brand>(`${environment.apiUrl}/brands`, brand);
  }

  updateBrand(brand: Brand): Observable<Brand>{
    return this.http.put<Brand>(`${environment.apiUrl}/brands/${brand.id}`, brand);
  }
}
