
import { Component, Inject } from '@angular/core';
import { Wallet } from '../../../interfaces/wallet';
import { WalletComponent } from "../../main/wallet/wallet.component";
import { WalletService } from '../../../services/wallet.service';
import { RouterModule, Router } from '@angular/router';
import { map } from 'rxjs';
//Material Design
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PocketService } from '../../../services/pocket.service';
import { MovementService } from '../../../services/movement.service';




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

    // Obtener todos los movimientos (suponiendo que es un observable)
    const allMovements$ = this._movementService.getAll();

    // Obtener los pockets de la wallet específica (suponiendo que es un observable)
    const pocketsOfWallet$ = this._walletService.getPocketsOfWallet(id);

    // Utilizar RxJS para manipular los observables
    pocketsOfWallet$.pipe(
      map(pockets => {
        // Extraer solo los _id de los pockets
        return pockets.map((pocket: any) => pocket._id);
      })
    ).subscribe(pocketIds => {
      // Filtrar los movimientos según los _id de los pockets
      allMovements$.pipe(
        map(movements => {
          // Filtrar los movimientos cuyo pocket._id coincide con algún _id de los pockets de la wallet
          return movements.filter((movement:any) => pocketIds.includes(movement.pocket._id));
        })
      ).subscribe(filteredMovements => {
        // Los movimientos filtrados están ahora en filteredMovements
        console.log("filteredMovements: ", filteredMovements);
        
      });
    });


  }



}








