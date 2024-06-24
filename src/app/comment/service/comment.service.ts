import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Comment } from '../model/comment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  id_client: string | null = window.localStorage.getItem('id_client');
  constructor(private http:HttpClient ) { }

  addComment(comment: Comment, product_id: string): Observable<Comment>{
    return this.http.post<Comment>(`${environment.apiUrl}/clients/${this.id_client}/products/${product_id}/comments`, comment);
  }
}
