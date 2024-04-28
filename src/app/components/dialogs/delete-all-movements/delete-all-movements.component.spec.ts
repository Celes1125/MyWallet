import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAllMovementsComponent } from './delete-all-movements.component';

describe('DeleteAllMovementsComponent', () => {
  let component: DeleteAllMovementsComponent;
  let fixture: ComponentFixture<DeleteAllMovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAllMovementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteAllMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
