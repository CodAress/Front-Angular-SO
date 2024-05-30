import { Component } from '@angular/core';
import { CardProductComponent } from '../card-product/card-product.component';
import { ProductService } from '../../service/product.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  constructor(private productService: ProductService) {}
  products: any;
  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log(this.products);
    });

  }

}
/*
[
  {
    "id": "6658140e8460eb09cc7cab4d",
    "name": "KUMARA K552",
    "description": "Un best-seller aclamado, y con razón. El Kumara es un teclado mecánico TKL (sin pad numérico);compacto, pero ampliamente funcional. Y muy fuerte, gracias a que su estructura está reforzada con acero. Es virtualmente irrompible y tiene una durabilidad extraordinaria.",
    "category_id": null,
    "brand_id": null,
    "price": 43.12,
    "stock": 50,
    "images": [
      "https://cyccomputer.pe/54108-medium_default/teclado-redragon-kumara-k552-kr-rainbow-mecanico-switch-red-espanol-pnk552-kr.jpg",
      "https://cyccomputer.pe/54112-medium_default/teclado-redragon-kumara-k552-kr-rainbow-mecanico-switch-red-espanol-pnk552-kr.jpg"
    ],
    "specifications": {
      "TIPO DE TECLADO": "Mecánico",
      "TIPO DE SWITCHES": "Redragon Blue o Red, de acuerdo disponibilidad del distribuidor.",
      "RETROILUMINADO": "Sí. Iluminación RGB Chroma para versión RGB; iluminación Rainbow.",
      "SOFTWARE": "Sí."
    }
  }
]

*/
