
import { Component, OnInit } from '@angular/core';
import { TopMenuComponent } from "../../components/menu/top-menu/top-menu.component";
import { BottomMenuComponent } from "../../components/menu/bottom-menu/bottom-menu.component";
import { HomeComponent } from "../../components/main/home/home.component";
import { WalletsPageComponent } from "../wallets-page/wallets-page.component";
import { ReportsPageComponent } from "../reports-page/reports-page.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [CommonModule, TopMenuComponent, BottomMenuComponent, HomeComponent, WalletsPageComponent, ReportsPageComponent]
})
export class DashboardComponent implements OnInit{
  homeFlag:boolean=true
  walletFlag:boolean =false
  reportFlag:boolean=false 
  
  ngOnInit() {    

  }

  setHomeFlag(flag:boolean){
    this.homeFlag=flag
    this.walletFlag=false
    this.reportFlag=false
  }
  setWalletFlag(flag:boolean){
    this.walletFlag=flag
    this.reportFlag=false
    this.homeFlag=false
  }
  setReportFlag(flag:boolean){
    this.reportFlag=flag
    this.homeFlag=false
    this.walletFlag=false
  }







}
