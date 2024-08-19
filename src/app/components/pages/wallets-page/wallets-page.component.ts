import { WalletsDialogComponent } from './../../dialogs/wallets-dialog/wallets-dialog.component';
import { Component } from '@angular/core';
import { WalletComponent } from '../../main/wallet/wallet.component';
import { WalletService } from '../../../services/wallet.service';
import { FormsModule } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { RouterModule, Router } from '@angular/router';
import { Wallet } from '../../../interfaces/wallet';
import { SharedService } from '../../../services/shared.service';
import { Observable } from 'rxjs';
// Material Design
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-wallets-page',
  standalone: true,
  templateUrl: './wallets-page.component.html',
  styleUrl: './wallets-page.component.css',
  imports: [WalletComponent, MatTableModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatIconModule, FormsModule, MatDialogModule, RouterModule]
})
export class WalletsPageComponent {

  wallets!: any
  dataSource: any = []
  selection = new SelectionModel<any>(false, [])
  router: Router = new Router
  labelPosition: 'before' | 'after' = 'before';
  deleteFlag: boolean = true

  constructor(
    private walletService: WalletService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) {
    this.getAllWallets()
  }

  getAllWallets() {
    this.walletService.getAll().subscribe(
      (response: Observable<Wallet[]>) => {
        return this.wallets = response,
          this.dataSource = new MatTableDataSource(this.wallets);
      })
  }

  handleChange(value: Wallet) {
    this.sharedService.setSelectedValue(value);
  }

  displayedColumns: string[] = ['check', 'edit', 'delete'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(element?: any): string {

    return `${this.selection.isSelected(element) ? 'deselect' : 'select'} row ${element.position + 1}`;
  }

  showWalletAtHome(wallet: any) {
    this.selection.clear();
    this.selection.select(wallet);
    this.handleChange(wallet)
  }

  openEditWalletDialog(walletId:string) {

    const dialogRef = this.dialog.open(WalletsDialogComponent, {
      data: {
        walletToEditId: walletId
      }
    })
    dialogRef.afterClosed().subscribe(
      response => {
        if (response) {
          alert("wallet edited ok")
          this.getAllWallets()
            ;
        }
      });
  }

  openDeleteWalletDialog(walletId: string) {    
    const dialogRef = this.dialog.open(WalletsDialogComponent, {
      data: {
        walletToDeleteId: walletId       
      }
    })
  this.dataSource  
     
    dialogRef.afterClosed().subscribe(() => {
     
      this.selection.clear();
      this.sharedService.setSelectedValue(null)
      this.router.navigateByUrl('/dashboard')
      this.getAllWallets()
      
    });
  }

  openAddWalletDialog() {
    const dialogRef = this.dialog.open(WalletsDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(
      (response: any) => {
        if (response) {
          alert("wallet added ok")
          this.router.navigateByUrl('/dashboard')
          this.getAllWallets()

        }
      });

  }

}