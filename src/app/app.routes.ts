import { Routes } from '@angular/router';
import { LoginComponent } from './login/components/login/login.component';
import { ProductsComponent } from './product/components/products/products.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' }, // Ruta por defecto
    { path: '**', redirectTo: '/products' } // Ruta para cualquier ruta no encontrada
];