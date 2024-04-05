import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {  
  private selectedValueSubject = new BehaviorSubject<string | null>(null);
  selectedValue$ = this.selectedValueSubject.asObservable();
  

  setSelectedValue(value: any | null) {
    this.selectedValueSubject.next(value);
  }
}
