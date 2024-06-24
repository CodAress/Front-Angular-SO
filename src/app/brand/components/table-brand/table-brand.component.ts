import { Component, ViewChild, SimpleChanges, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Brand } from '../../model/brand';
import { BrandService } from '../../service/brand.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTable, MatTableModule} from '@angular/material/table';
import { CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogViewBrandComponent } from '../dialog-view-brand/dialog-view-brand.component';
import { DialogEditBrandComponent } from '../dialog-edit-brand/dialog-edit-brand.component';

@Component({
  selector: 'app-table-brand',
  standalone: true,
  imports: [
    MatTableModule, 
    MatIconModule,
    MatButtonModule,
    CdkDrag,
    CdkDropList,
    DialogViewBrandComponent,
    MatDialogModule,
    DialogEditBrandComponent
  ],
  templateUrl: './table-brand.component.html',
  styleUrl: './table-brand.component.css'
})
export class TableBrandComponent implements OnInit {
  @ViewChild('table', { static: true }) table!: MatTable<Brand>;
  @Input() tableName: string = '';

  brands: Brand[] = [];
  displayedColumns: string[] = ['position', 'name', 'actions'];
  dataSource: Brand[] = [];
  constructor( public dialog: MatDialog, private brandService: BrandService) {}


  ngOnInit(): void {
    this.brandService.getBrands().subscribe(brands => {
      this.brands = brands;
      this.updateDataSource();  // Actualiza el dataSource después de recibir los datos
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['brands']) {
      this.updateDataSource();
    }
  }

  updateDataSource(): void {
    this.dataSource = this.brands.map((brand, index) => ({
      ...brand,
      position: index + 1,
      name: brand.name
    }));
  }

  drop(event: CdkDragDrop<Brand[]>): void {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.brands, prevIndex, event.currentIndex);
    this.updateDataSource();  // Actualiza el dataSource después de rearrange
    this.table.renderRows();
  }

  openViewDialog(brand: Brand): void {
    const dialogView = this.dialog.open(DialogViewBrandComponent, {
      data: { 
        id: brand.id,
        name: brand.name,
        description: brand.description,
        logo: brand.logo
      }
    });

    dialogView.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    // Implementa la lógica para abrir el diálogo de vista
  }

  openEditDialog(brand: Brand): void {
    // Implementa la lógica para abrir el diálogo de edición
    const dialogEdit = this.dialog.open(DialogEditBrandComponent, {
      data: { 
        id: brand.id,
        name: brand.name,
        description: brand.description,
        logo: brand.logo
      }
    });

    dialogEdit.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDeleteDialog(brand: Brand): void {
    // Implementa la lógica para abrir el diálogo de eliminación
  }

  openAddDialog(): void{
    
  }
}
