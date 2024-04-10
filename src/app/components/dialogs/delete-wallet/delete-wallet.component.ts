
import { Component, Inject } from '@angular/core';
import { Wallet } from '../../../interfaces/wallet';
import { WalletComponent } from "../../main/wallet/wallet.component";
import { WalletService } from '../../../services/wallet.service';
import { RouterModule, Router } from '@angular/router';
import { flatMap, from, map, mergeMap, reduce, switchMap } from 'rxjs';
//Material Design
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PocketService } from '../../../services/pocket.service';
import { MovementService } from '../../../services/movement.service';
import { Pocket } from '../../../interfaces/pocket';
import { subscribe } from 'diagnostics_channel';




@Component({
  selector: 'app-delete-wallet',
  standalone: true,
  templateUrl: './delete-wallet.component.html',
  styleUrl: './delete-wallet.component.css',
  imports: [MatDialogModule, WalletComponent, RouterModule]
})
export class DeleteWalletComponent {
  wallet: Wallet
  router: Router = new Router()
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(WalletService) private _walletService: WalletService,
    @Inject(PocketService) private _pocketService: PocketService,
    @Inject(MovementService) private _movementService: MovementService

  ) {
    this.wallet = this.data.walletToDelete
  }

   
    
  delete(id: any) {   
    
     this._walletService.delete(id)
        
  }
  



}








