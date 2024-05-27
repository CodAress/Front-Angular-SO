import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardLoginComponent } from './login/components/card-login/card-login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NerdyNest';
}
