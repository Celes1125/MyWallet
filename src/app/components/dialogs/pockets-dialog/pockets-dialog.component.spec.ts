import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketsDialogComponent } from './pockets-dialog.component';

describe('PocketsDialogComponent', () => {
  let component: PocketsDialogComponent;
  let fixture: ComponentFixture<PocketsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocketsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PocketsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
