import { Component, OnInit } from '@angular/core';
import { WalletComponent } from "../../components/wallet/wallet.component";
import { WalletService } from '../../services/wallet.service';

@Component({
    selector: 'app-wallets-page',
    standalone: true,
    templateUrl: './wallets-page.component.html',
    styleUrl: './wallets-page.component.css',
    imports: [WalletComponent]
})
export class WalletsPageComponent implements OnInit{
wallets: any
constructor (private walletService:WalletService){

}
  ngOnInit(): void {
    this.getAllWallets()
  }

getAllWallets(){
  this.walletService.getAll().subscribe(
    response => this.wallets = response
  )
}
}
