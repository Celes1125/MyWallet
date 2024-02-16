import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWalletNameComponent } from './edit-wallet-name.component';

describe('EditWalletNameComponent', () => {
  let component: EditWalletNameComponent;
  let fixture: ComponentFixture<EditWalletNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWalletNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditWalletNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
