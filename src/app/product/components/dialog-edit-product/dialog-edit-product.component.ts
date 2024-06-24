import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

import { MatSelectChange } from '@angular/material/select';

export interface DialogData {
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  images: string[];
  specifications: any;
}


@Component({
  selector: 'app-dialog-edit-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule
  ],
  templateUrl: './dialog-edit-product.component.html',
  styleUrl: './dialog-edit-product.component.css'
})
export class DialogEditProductComponent implements OnInit {

  specificationKeys!: string[];
  selectedBrand: any;
  selectedCategory: any;

  brands: any = this.data.brands;
  categories: any = this.data.categories;

  constructor(
    public dialogRef: MatDialogRef<DialogEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Data: ', this.data);
    this.selectedBrand = this.brands.find((brand: { id: string; }) => brand.id === this.data.brand);
    this.selectedCategory = this.categories.find((category: { id: string; }) => category.id === this.data.category);
    console.log('Selected brand: ', this.selectedBrand);
    console.log('Selected category: ', this.selectedCategory);
  }
  ngOnInit() {
    this.specificationKeys = Object.keys(this.data.specifications);
    console.log("Dialog product: " + this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onBrandChange(brand: any) {
    this.selectedBrand = brand;
    this.data.brand = brand.id; // Aquí guardas el ID de la marca seleccionada
    console.log('Selected brand: ', this.selectedBrand);
  }

  onCategoryChange(category: any) {
    this.selectedCategory = category;
    this.data.category = category.id; // Aquí guardas el ID de la categoría seleccionada
    console.log('Selected category: ', this.selectedCategory);
  }


  saveChanges(): void {
    // Llama a close con los datos actualizados
    this.dialogRef.close(this.data);
  }
}
