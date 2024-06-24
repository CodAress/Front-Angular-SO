import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { 
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { MatExpansionModule } from '@angular/material/expansion';
import { Brand } from '../../model/brand';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrandService } from '../../service/brand.service';

@Component({
  selector: 'app-dialog-edit-brand',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './dialog-edit-brand.component.html',
  styleUrl: './dialog-edit-brand.component.css'
})
export class DialogEditBrandComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogEditBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Brand,
    private brandService: BrandService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.brandService.updateBrand(this.data).subscribe(brand => {
      this.data = brand;
    });
    this.dialogRef.close(this.data);
  }
}
