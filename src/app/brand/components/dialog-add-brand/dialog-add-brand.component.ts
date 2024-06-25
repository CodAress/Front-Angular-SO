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
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-add-brand',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon
  ],
  templateUrl: './dialog-add-brand.component.html',
  styleUrl: './dialog-add-brand.component.css'
})
export class DialogAddBrandComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAddBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Brand,
    private brandService: BrandService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.brandService.createBrand(this.data).subscribe(brand => {
      this.data = brand;
    });
    this.dialogRef.close(this.data);
  }
}
