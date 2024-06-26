import { Routes } from '@angular/router';
import { LoginComponent } from './login/components/login/login.component';
import { ProductsClientComponent } from './product/components/products-client/products-client.component';
import { ProductsAdminComponent } from './product/components/products-admin/products-admin.component';
import { ShoppingCartComponent } from './shopping-cart/components/shopping-cart/shopping-cart.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'client/products', component: ProductsClientComponent },
    { path: 'admin/products', component: ProductsAdminComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    //{ path: '', redirectTo: 'client/products', pathMatch: 'full' }, // Ruta por defecto
    { path: '**', redirectTo: 'client/products' } // Ruta para cualquier ruta no encontrada
];