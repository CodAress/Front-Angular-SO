import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { ProductRequestToPost } from '../model/productRequestToPost';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor(private http: HttpClient) { }

  setProducts(products: Product[]): void {
    this.productsSubject.next(products);
  }

  getProduct(id: string): Observable<Product>{
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  updateProduct(brand_id: String, category_id: String, updatedProduct: Product): void {
    ///brand/{brand_id}/category{category_id}/products/{product_id}
    this.http.put<Product>(`${environment.apiUrl}/brands/${brand_id}/categories/${category_id}/products/${updatedProduct.id}`, updatedProduct)
      .pipe(tap(() => {
        const products = this.productsSubject.value.map(product =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
        this.productsSubject.next(products);
      }))
      .subscribe();
  }

  addProduct(brand_id: String, category_id: String, newProduct: ProductRequestToPost): void {
    this.http.post<Product>(`${environment.apiUrl}/categories/${category_id}/brands/${brand_id}/products`, newProduct)
      .pipe(tap((product: Product) => {
        this.productsSubject.next([...this.productsSubject.value, product]);
      }))
      .subscribe();
  }
}
