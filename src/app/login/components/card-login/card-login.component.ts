import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router, RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { LoginService, LoginRequest } from '../../service/login.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-card-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatGridListModule],
  templateUrl: './card-login.component.html',
  styleUrl: './card-login.component.css'
})
export class CardLoginComponent {
  //Para el email
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  //Para el password
  passwordFormControl = new FormControl('', [Validators.required]);
  hide = true;

  constructor(private loginService: LoginService, private router: Router) { }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  // Método para manejar el inicio de sesión
  onLogin() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      const request: LoginRequest = {
        email: this.emailFormControl.value ?? '',
        password: this.passwordFormControl.value ?? ''
      };
  
      this.loginService.login(request).subscribe(response => {
        console.log(response); // Aquí puedes manejar la respuesta del inicio dae sesión
  
        // Verifica el rol del usuario y redirige a la ruta correspondiente
        if (response === "ADMIN") {
          this.router.navigate(['/admin/products']);
          window.localStorage.setItem('role', 'ADMIN');
        } else if (response === "CLIENT") {
          this.router.navigate(['/client/products']);
          window.localStorage.setItem('role', 'CLIENT');
  
          // Obtiene el ID del cliente después de obtener el rol
          this.loginService.getIdClient(request.email.toString(), request.password.toString()).subscribe(id => {
            console.log(id);
            window.localStorage.setItem('id_client', id);
          });
        } else {
          // Redirige a la ruta por defecto
        }
      });
    }
  }
  
}
