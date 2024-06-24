import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule } from '@angular/material/list';
import { loginGuard } from '../../../guards/login.guard';
import { AdminViewService } from '../../service/admin-view.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatMenuModule, MatListModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  constructor(private adminViewService: AdminViewService, private router:Router){}
  loginGuard = loginGuard;
  toggleDrawer() {
    this.drawer.toggle();
  }

  adminAddProduct() {
    this.adminViewService.changeView('admin-products');
    this.drawer.toggle();
  }

  adminAddBrand() {
    this.adminViewService.changeView('admin-brands');
    this.drawer.toggle();
  }
  logout() {
    this.router.navigate(['client/products']);
    window.localStorage.removeItem('role');
    window.localStorage.removeItem('id_client');

  }
}
