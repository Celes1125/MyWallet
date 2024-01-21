import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPocketComponent } from './edit-pocket.component';

describe('EditPocketComponent', () => {
  let component: EditPocketComponent;
  let fixture: ComponentFixture<EditPocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPocketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
