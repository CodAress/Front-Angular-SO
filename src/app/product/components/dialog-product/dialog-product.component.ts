import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

import {MatExpansionModule} from '@angular/material/expansion';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImgSliderComponent } from '../img-slider/img-slider.component';

@Component({
  selector: 'app-dialog-product',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatExpansionModule, ImgSliderComponent],
  templateUrl: './dialog-product.component.html',
  styleUrl: './dialog-product.component.css'
})
export class DialogProductComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    //mejorar para que sea global (use un servicio para obtener la tasa de conversión)[use en tableproduct, dialogproduct]
    converstionRate: number = this.data.converstionRate;
  panelOpenState = true;
}
