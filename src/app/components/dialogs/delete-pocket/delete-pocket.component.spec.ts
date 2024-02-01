import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePocketComponent } from './delete-pocket.component';

describe('DeletePocketComponent', () => {
  let component: DeletePocketComponent;
  let fixture: ComponentFixture<DeletePocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePocketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletePocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
