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
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';


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
export class DialogEditProductComponent implements OnInit{
  specificationKeys!: string[];

  constructor(
    public dialogRef: MatDialogRef<DialogEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  ngOnInit() {
    this.specificationKeys = Object.keys(this.data.specifications);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
