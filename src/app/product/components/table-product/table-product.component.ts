import { Component, ViewChild, Input, Output, EventEmitter, SimpleChanges, OnInit   } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Product } from '../../model/product';

import {DialogProductComponent} from '../dialog-product/dialog-product.component';
import { MatDialog } from '@angular/material/dialog';

import { DialogEditProductComponent } from '../dialog-edit-product/dialog-edit-product.component';
import { every } from 'rxjs';
import { Brand } from '../../../brand/model/brand';
import { BrandService } from '../../../brand/service/brand.service';
import { ProductService } from '../../service/product.service';
import { CategoryService } from '../../../category/service/category.service';
import { Category } from '../../../category/model/category';

import { DialogAddProductComponent } from '../dialog-add-product/dialog-add-product.component';

import { ProductRequestToPost } from '../../model/productRequestToPost';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-table-product',
  standalone: true,
  imports: [CdkDropList, CdkDrag, MatTableModule, MatIconModule, MatButtonModule, DialogEditProductComponent, DialogProductComponent, DialogAddProductComponent],
  templateUrl: './table-product.component.html',
  styleUrl: './table-product.component.css'
})
export class TableProductComponent implements OnInit{
  @ViewChild('table', {static: true}) table!: MatTable<Product>;
  @Input() conversionRate: number = 1;
  @Input() tableName: string = '';
  brands: Brand[] = [];
  products: Product[] = [];
  categories: Category[] = [];

  constructor(public dialog: MatDialog, private brandService:BrandService, private productService:ProductService, private categoryService: CategoryService) {this.updateDataSource();}

  displayedColumns: string[] = ['position', 'name', 'category', 'brand', 'stock', 'price', 'actions'];
  dataSource: Product[] = [];

  ngOnInit(): void {
    forkJoin({
      categories: this.categoryService.getCategories(),
      brands: this.brandService.getBrands(),
      products: this.productService.getProducts()
    }).subscribe(({ categories, brands, products }) => {
      this.categories = categories;
      this.brands = brands;
      this.products = products;
      this.updateDataSource();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products']) {
      this.updateDataSource();
    }
  }
  //Si hubo algun cambio en la lista de productos, se actualiza la tabla
  updateBrands() {
    
    this.brandService.getBrands().subscribe(brands => {
      this.brands = brands;
    });
    
     /*
    const brand = this.brands.find((brand: { id: string; }) => brand.id === brandId);
    return brand ? brand.name : 'Marca desconocida';
    */
  }

  getBrandName(brandId: string) {
    const brand = this.brands.find((brand: { id: string; }) => brand.id === brandId);
    return brand ? brand.name : 'Marca desconocida';
  }

  getCategoryName(categoryId: string) {
    const category = this.categories.find((category: { id: string; }) => category.id === categoryId);
    return category ? category.name : 'Categoría desconocida';
  }

  updateDataSource() {
    this.dataSource = this.products.map((product, index) => ({
      ...product,
      position: index + 1,
      stock: product.stock,
      category: this.getCategoryName(product.category_id),
      brand: this.getBrandName(product.brand_id)
    }));
  }
  drop(event: CdkDragDrop<string>) {
    const previousIndex = this.dataSource.findIndex(d => d === event.item.data);
    moveItemInArray(this.dataSource, previousIndex, event.currentIndex);
    this.table.renderRows();

  }
  //para el dialog(pop-up)
  openViewDialog(product: Product) {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      data: {
        productName: product.name,
        productDescription: product.description,
        productImage: product.images[0], // Asume que images es un array y usas la primera imagen
        productPrice: product.price,
        productBrand: this.getBrandName(product.brand_id), // Necesitarás reemplazar esto si tienes una forma de obtener el nombre de la marca
        productTechnicalSpecifications: product.specifications, // Asume que specifications es un objeto
        converstionRate: this.conversionRate
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  //para el dialog edit product
  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(DialogEditProductComponent, {
      data: {
        name: product.name,
        description: product.description,
        category: product.category_id,
        brand: product.brand_id,
        price: product.price,
        stock: product.stock,
        images: product.images,
        specifications: product.specifications,
        brands: this.brands,
        categories: this.categories
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      ////this.animal = result;
      //result.id = product.id;
      if (result) {
        result.id = product.id;
        this.productService.updateProduct(result.brand, result.category, result);
        console.log(result);
      }
      this.editProduct(result);
    });

  }
  //para el dialog delete product (mejorar despues)
  editProduct(product: Product) {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      this.products[index] = product;
      this.updateDataSource();
    }
  }

  //para el add product
  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogAddProductComponent, {
      data: {
        name: '',
        description: '',
        category: '',
        brand: '',
        price: 0,
        stock: 0,
        images: [],
        specifications: {},
        brands: this.brands,
        categories: this.categories
      },
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        const productRequest: ProductRequestToPost = {
          name: result.name,
          description: result.description,
          price: result.price,
          stock: result.stock,
          images: result.images,
          specifications: result.specifications
        };

        this.productService.addProduct(result.brand_id, result.category_id, productRequest);
        console.log(result);
        this.addProduct(result);
      }
    });
  }
  addProduct(product: Product) {
    this.products.push(product);
    this.updateDataSource();
  }

}
