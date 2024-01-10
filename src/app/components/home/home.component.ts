import { Component } from '@angular/core';
import { WalletComponent } from "../wallet/wallet.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [WalletComponent]
})
export class HomeComponent {

}
