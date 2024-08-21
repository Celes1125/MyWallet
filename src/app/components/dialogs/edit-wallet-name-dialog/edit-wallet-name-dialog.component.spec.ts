import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWalletNameDialogComponent } from './edit-wallet-name-dialog.component';

describe('EditWalletNameDialogComponent', () => {
  let component: EditWalletNameDialogComponent;
  let fixture: ComponentFixture<EditWalletNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWalletNameDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditWalletNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
