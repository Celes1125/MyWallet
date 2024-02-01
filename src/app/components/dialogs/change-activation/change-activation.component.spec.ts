import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeActivationComponent } from './change-activation.component';

describe('ChangeActivationComponent', () => {
  let component: ChangeActivationComponent;
  let fixture: ComponentFixture<ChangeActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeActivationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
