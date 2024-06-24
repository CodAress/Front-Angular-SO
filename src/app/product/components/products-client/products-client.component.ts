import { Component } from '@angular/core';
import { CardProductComponent } from '../card-product/card-product.component';
import { ProductService } from '../../service/product.service';
import { BrandService } from '../../../brand/service/brand.service';
import { Product } from '../../model/product';
import { Brand } from '../../../brand/model/brand';

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
  constructor(private productService: ProductService, private brandService: BrandService) {}
  products: Product[] = [];
  brands: Brand[] = [];
  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
    this.brandService.getBrands().subscribe(brands => {
      this.brands = brands;
      console.log(this.brands);
    });
  }

  getBrandName(brandId: string): string {
    const brand = this.brands.find(brand => brand.id === brandId);
    return brand ? brand.name : '';
  }
}
