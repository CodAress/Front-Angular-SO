import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Client {
  
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dni: string;
  birthDate: string;
  postalCode: string;
  address: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/loggin`;
  constructor(private http: HttpClient) { }
  login(request: LoginRequest): Observable<String> {
    return this.http.post<String>(this.apiUrl, request);
  }
  getIdClient(email: string, password: string): Observable<string> {
    return this.http.get<Client>(`${environment.apiUrl}/clients/login/${email}/${password}`).pipe(
      map((response: Client) => {
        const id = response.id;
        console.log(id);
        return id;
      })
    );
  }
  
}
