import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsDialogComponent } from './wallets-dialog.component';

describe('WalletsDialogComponent', () => {
  let component: WalletsDialogComponent;
  let fixture: ComponentFixture<WalletsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalletsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
