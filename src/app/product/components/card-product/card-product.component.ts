import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { DialogProductComponent } from '../dialog-product/dialog-product.component';
import { loginGuard } from '../../../guards/login.guard';
import { CommentDialogComponent } from '../../../comment/components/comment-dialog/comment-dialog.component';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommentDialogComponent],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {
  @Input() productId!: string;
  @Input() productName!: string;
  @Input() productDescription!: string;
  @Input() productImage!: string[];
  @Input() productPrice!: number;
  @Input() productBrand!: string;
  @Input() productTechnicalSpecifications!: Record<string, any>;
  converstionRate: number = 3.7;
  loginGuard = loginGuard;
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      data: {
        productName: this.productName,
        productDescription: this.productDescription,
        productImage: this.productImage,
        productPrice: this.productPrice,
        productBrand: this.productBrand,
        productTechnicalSpecifications: this.productTechnicalSpecifications,
        converstionRate: this.converstionRate
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogAddComment() {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      
      data: {
        productId: this.productId,
        productName: this.productName,
        productDescription: this.productDescription,
        productImage: this.productImage,
        productPrice: this.productPrice,
        productBrand: this.productBrand,
        productTechnicalSpecifications: this.productTechnicalSpecifications,
        converstionRate: this.converstionRate
      }
    });
    console.log("id_product: " + this.productId);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
