import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminViewService {

  private viewSource = new BehaviorSubject('products');
  currentView = this.viewSource.asObservable();

  constructor() { }

  changeView(view: string) {
    this.viewSource.next(view);
  }
  
}
