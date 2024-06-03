import { Component } from '@angular/core';
import { TableProductComponent } from '../table-product/table-product.component';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-products-admin',
  standalone: true,
  imports: [TableProductComponent],
  templateUrl: './products-admin.component.html',
  styleUrl: './products-admin.component.css'
})
export class ProductsAdminComponent {
  myProducts: Product[] = []; // Aquí debes asignar tus productos
  myConversionRate: number = 1; // Aquí debes asignar tu tasa de conversión
  tablename: string = '';
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.myProducts = products;
      this.myConversionRate = 3.75; // Ejemplo de tasa de conversión
      console.log(this.myProducts);
      this.tablename = 'Products';
    });
  }

}
