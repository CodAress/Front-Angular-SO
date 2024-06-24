import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { Brand } from '../../model/brand';
@Component({
  selector: 'app-dialog-view-brand',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule
  ],
  templateUrl: './dialog-view-brand.component.html',
  styleUrl: './dialog-view-brand.component.css'
})
export class DialogViewBrandComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogViewBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Brand,//actualizar para indicar que tipo de dato recibir
  ) {console.log(data);}
  
  ngOnInit(): void {
    console.log(this.data.name);
  }
}
