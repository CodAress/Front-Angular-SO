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
import { ProductRequest } from '../../model/productRequest';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-add-product',
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
    MatSelectModule,
    CommonModule 
  ],
  templateUrl: './dialog-add-product.component.html',
  styleUrl: './dialog-add-product.component.css'
})
export class DialogAddProductComponent implements OnInit {
  productRequest: ProductRequest = {
    name: '',
    description: '',
    category_id: '',
    brand_id: '',
    price: 0,
    stock: 0,
    images: [],
    specifications: {}
  };
  brands: any = this.data.brands;
  categories: any = this.data.categories;

  selectedBrand: any;
  selectedCategory: any;
  specificationKeys: string[] = [];

  newSpecKey: string = '';
  newSpecValue: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogAddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.specificationKeys = Object.keys(this.productRequest.specifications);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onBrandChange(brand: any) {
    this.selectedBrand = brand;
    this.productRequest.brand_id = brand.id;
  }

  onCategoryChange(category: any) {
    this.selectedCategory = category;
    this.productRequest.category_id = category.id;
  }

  addSpecification(): void {
    if (this.newSpecKey && this.newSpecValue) {
      this.productRequest.specifications[this.newSpecKey] = this.newSpecValue;
      this.specificationKeys.push(this.newSpecKey);
      this.newSpecKey = '';
      this.newSpecValue = '';
    }
  }

  removeSpecification(key: string): void {
    delete this.productRequest.specifications[key];
    this.specificationKeys = this.specificationKeys.filter(k => k !== key);
  }

  saveChanges(): void {
    this.dialogRef.close(this.productRequest);
  }
}
