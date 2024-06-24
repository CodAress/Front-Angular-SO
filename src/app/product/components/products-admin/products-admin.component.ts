import { Component } from '@angular/core';
import { TableProductComponent } from '../table-product/table-product.component';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { BrandService } from '../../../brand/service/brand.service';
import { Brand } from '../../../brand/model/brand';
import { CategoryService } from '../../../category/service/category.service';
import { Category } from '../../../category/model/category';

import { TableBrandComponent } from '../../../brand/components/table-brand/table-brand.component';
import { AdminViewService } from '../../../navbar/service/admin-view.service';
import { loginGuard } from '../../../guards/login.guard';

@Component({
  selector: 'app-products-admin',
  standalone: true,
  imports: [TableProductComponent, TableBrandComponent],
  templateUrl: './products-admin.component.html',
  styleUrl: './products-admin.component.css'
})
export class ProductsAdminComponent {
  myProducts: Product[] = []; // Aquí debes asignar tus productos
  myConversionRate: number = 1; // Aquí debes asignar tu tasa de conversión
  myBrands: Brand[] = [];
  myCategories: Category[] = [];
  constructor(private productService: ProductService, private brandService: BrandService, private categoryService: CategoryService, private adminViewService: AdminViewService) {}
  currentView!: string;
  loginGuard = loginGuard;
  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.myProducts = products;
      this.myConversionRate = 3.75; // Ejemplo de tasa de conversión
      console.log(this.myProducts);
      this.currentView = 'admin-products'; // Cambia 'products' por 'admin-products
      this.adminViewService.currentView.subscribe(view => this.currentView = view);
    });

    this.productService.getProducts();

    this.brandService.getBrands().subscribe(brands => {
      this.myBrands = brands;
      console.log(this.myBrands);
    });

    this.categoryService.getCategories().subscribe(categories => {
      this.myCategories = categories;
      console.log(this.myCategories);
    });
  }

}
