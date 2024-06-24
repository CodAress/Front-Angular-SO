import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewBrandComponent } from './dialog-view-brand.component';

describe('DialogViewBrandComponent', () => {
  let component: DialogViewBrandComponent;
  let fixture: ComponentFixture<DialogViewBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogViewBrandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogViewBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
