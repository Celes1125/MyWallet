import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWalletDialogComponent } from './delete-wallet-dialog.component';

describe('DeleteWalletDialogComponent', () => {
  let component: DeleteWalletDialogComponent;
  let fixture: ComponentFixture<DeleteWalletDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteWalletDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteWalletDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
