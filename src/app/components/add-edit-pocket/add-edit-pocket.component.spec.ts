import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPocketComponent } from './add-edit-pocket.component';

describe('AddEditPocketComponent', () => {
  let component: AddEditPocketComponent;
  let fixture: ComponentFixture<AddEditPocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPocketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditPocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
