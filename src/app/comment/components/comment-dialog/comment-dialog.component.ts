import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { 
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { MatExpansionModule } from '@angular/material/expansion';
//import { Brand } from '../../model/brand';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../../product/model/product';
import { CommentService } from '../../service/comment.service';
//import { BrandService } from '../../service/brand.service';
import { Comment } from '../../model/comment';

@Component({
  selector: 'app-comment-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './comment-dialog.component.html',
  styleUrl: './comment-dialog.component.css'
})
export class CommentDialogComponent {
  commentRequest: Comment = {
    description: '',
    rating: 0
  };
  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commentService: CommentService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    console.log("product id data: " + this.data.productId);
    this.commentService.addComment(this.commentRequest,this.data.productId).subscribe(comment => {
      this.commentRequest = comment;
    });
    this.dialogRef.close(this.commentRequest);
  }
}
