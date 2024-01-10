import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PocketComponent } from "../pocket/pocket.component";
import { WalletService } from './../../services/wallet.service';
import { Observable, catchError, finalize, of, tap } from 'rxjs';
import { AddEditPocketComponent } from '../add-edit-pocket/add-edit-pocket.component';
import { MatDialog } from '@angular/material/dialog';
import { MaterialDesignModule } from '../../material-design.module';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-wallet',
    standalone: true,
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css'],
    imports: [FormsModule, PocketComponent, CommonModule, MaterialDesignModule]
})
export class WalletComponent  {

    pockets$!: Observable<any>
    walletName$!: string
    walletId$!: string
    hasError: boolean = false
    activeWallet$: Observable<any>
    pockets: any[] = []
   

    constructor(
        private walletService: WalletService,
        public addDialog:MatDialog
    ) {

        //GETTING DE ACTIVE WALLET

        this.activeWallet$ = this.walletService.getAll().pipe(
            tap((response: any) => {
                if (response) {
                    const activeWallets = response.filter((wallet: any) => wallet.activated);
                    // Si hay alguna wallet con activated=true, devolvemos su _id
                    if (activeWallets.length > 0) {

                        const activeWallet = activeWallets[0]
                        this.walletName$ = activeWallet.name
                        this.walletId$ = activeWallet._id
                        console.log('RESPONSE: ', activeWallets[0])
                        console.log('NAME: ', this.walletName$)
                        console.log('ID: ', this.walletId$)


                        // Acá suscribo al observable de bolsillos
                        this.pockets$ = this.walletService.getPocketsOfWallet(this.walletId$).pipe(
                            tap((response: any) => {
                                this.pockets = response
                            })
                        )
                        return this.activeWallet$ = activeWallet
                    } else {
                        // Si no hay ninguna wallet con activated=true, devolvemos null;
                        return null;
                    }
                };
            }),
            catchError((error) => {
                alert('ERROR: ' + error);
                this.hasError = true;
                // Devuelve un observable vacío o un observable de valor predeterminado en caso de error
                return of(null);
            }),
            finalize(() => {
                console.log('La suscripción se ha completado');
            })

        )
        this.activeWallet$.subscribe()

    }

    createPocket(id?:string){        
            const dialog = this.addDialog.open(AddEditPocketComponent, {
              width: '550px',
              disableClose: true,
              data: { id: id }
              
            });
          }

    }










