import { Routes } from '@angular/router';
import { LoginComponent } from './login/components/login/login.component';
import { HomeComponent } from './home/components/home/home.component';

export const routes: Routes = [
    { path: 'profile', redirectTo: (urlInfo) => { console.log(urlInfo); return '/login'; }, pathMatch: 'full'},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent }
];
