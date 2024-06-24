import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditBrandComponent } from './dialog-edit-brand.component';

describe('DialogEditBrandComponent', () => {
  let component: DialogEditBrandComponent;
  let fixture: ComponentFixture<DialogEditBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditBrandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
