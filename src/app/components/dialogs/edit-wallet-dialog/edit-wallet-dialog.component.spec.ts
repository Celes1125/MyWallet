import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWalletDialogComponent } from './edit-wallet-dialog.component';

describe('EditWalletDialogComponent', () => {
  let component: EditWalletDialogComponent;
  let fixture: ComponentFixture<EditWalletDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWalletDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditWalletDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
