import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWalletComponent } from './delete-wallet.component';

describe('DeleteWalletComponent', () => {
  let component: DeleteWalletComponent;
  let fixture: ComponentFixture<DeleteWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteWalletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
