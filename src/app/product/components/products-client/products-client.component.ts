import { Component } from '@angular/core';
import { CardProductComponent } from '../card-product/card-product.component';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-products-client',
  standalone: true,
  imports: [
    CardProductComponent
  ],
  templateUrl: './products-client.component.html',
  styleUrl: './products-client.component.css'
})
export class ProductsClientComponent {
  constructor(private productService: ProductService) {}
  products: any;
  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log(this.products);
    });

  }
}
