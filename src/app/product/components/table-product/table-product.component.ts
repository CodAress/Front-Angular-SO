import { Component, ViewChild, Input, Output, EventEmitter, SimpleChanges   } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Product } from '../../model/product';

import {DialogProductComponent} from '../dialog-product/dialog-product.component';
import { MatDialog } from '@angular/material/dialog';

import { DialogEditProductComponent } from '../dialog-edit-product/dialog-edit-product.component';
import { every } from 'rxjs';

@Component({
  selector: 'app-table-product',
  standalone: true,
  imports: [CdkDropList, CdkDrag, MatTableModule, MatIconModule, MatButtonModule, DialogEditProductComponent],
  templateUrl: './table-product.component.html',
  styleUrl: './table-product.component.css'
})
export class TableProductComponent {
  @ViewChild('table', {static: true}) table!: MatTable<Product>;
  @Input() products: Product[] = [];
  @Input() conversionRate: number = 1;
  @Input() tableName: string = '';

  constructor(public dialog: MatDialog) {}

  displayedColumns: string[] = ['position', 'name', 'category', 'brand', 'stock', 'price', 'actions'];
  dataSource: Product[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products']) {
      this.updateDataSource();
    }
  }

  updateDataSource() {
    this.dataSource = this.products.map((product, index) => ({
      ...product,
      position: index + 1,
      stock: product.stock,
      category: product.category_id,
      brand: product.brand_id
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
        productBrand: product.brand_id, // Necesitarás reemplazar esto si tienes una forma de obtener el nombre de la marca
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
      },
    });



    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
      result.id = product.id;
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

}
