import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { WalletComponent } from '../../main/wallet/wallet.component';
import { WalletService } from '../../../services/wallet.service';
import { FormsModule } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { EditWalletComponent } from '../../dialogs/edit-wallet/edit-wallet.component';
import { RouterModule, Router } from '@angular/router';

import { Wallet } from '../../../interfaces/wallet';
// Material Design
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteWalletComponent } from '../../dialogs/delete-wallet/delete-wallet.component';
import { AddWalletComponent } from '../../dialogs/add-wallet/add-wallet.component';

@Component({
  selector: 'app-wallets-page',
  standalone: true,
  templateUrl: './wallets-page.component.html',
  styleUrl: './wallets-page.component.css',
  imports: [AddWalletComponent, WalletComponent, MatTableModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatIconModule, FormsModule, MatDialogModule, RouterModule]
})
export class WalletsPageComponent {

  wallets: any[] = []
  dataSource: any = []
  selection = new SelectionModel<any>(false, [])
  router: Router = new Router
  labelPosition: 'before' | 'after' = 'before';

  constructor(
    private walletService: WalletService,
    public dialog: MatDialog) {
    this.getAllWallets()
  }

  getAllWallets() {
    this.walletService.getAll().subscribe(
      response => {
        this.wallets = response,
          this.dataSource = new MatTableDataSource(this.wallets);
      })
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

  active(wallet: any) {
    this.selection.clear();
    this.selection.select(wallet);
    const newWallets = [...this.wallets]
    newWallets.forEach(
      w => {
        if (w._id === wallet._id) {
          w.activated = true
        } else {
          w.activated = false
        }
      }
    )
    console.log("local:", newWallets)
    this.refreshWallets(newWallets)
  }

  inactive() {
    const newWallets = [...this.wallets]
    newWallets.forEach(
      w => {
        w.activated = false
      }
    )
    console.log("local:", newWallets)
    this.refreshWallets(newWallets)
  }

  refreshWallets(newWallets: Wallet[]) {
    newWallets.forEach(
      nw => {
        this.walletService.edit(nw).subscribe(
          response => console.log(response)
        )
      })


  }

  openEditWalletDialog(wallet: any) {
    const dialogRef = this.dialog.open(EditWalletComponent, {
      data: {
        walletToEdit: wallet
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

  openDeleteWalletDialog(wallet: Wallet) {
    const dialogRef = this.dialog.open(DeleteWalletComponent, {
      data: {
        walletToDelete: wallet

      }
    })
    dialogRef.afterClosed().subscribe(
      response => {
        if (response) {
          alert("wallet delete ok")
          this.getAllWallets()

        }
      });
  }

  openAddWalletDialog() {
    const dialogRef = this.dialog.open(AddWalletComponent, {
      data: {

      }
    });
    dialogRef.afterClosed().subscribe(
      (response: any) => {
        if (response) {
          alert("wallet added ok")
          this.getAllWallets()

        }
      });
     
  }

}















