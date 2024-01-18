import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPocketComponent } from './add-pocket.component';

describe('AddPocketComponent', () => {
  let component: AddPocketComponent;
  let fixture: ComponentFixture<AddPocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPocketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
