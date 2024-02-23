import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsPageComponent } from './vendors-page.component';

describe('VendorsPageComponent', () => {
  let component: VendorsPageComponent;
  let fixture: ComponentFixture<VendorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
