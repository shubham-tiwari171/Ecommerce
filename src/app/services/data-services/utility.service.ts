import { Injectable } from '@angular/core';
import { DataServicesService } from './data-services.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(private _dataServicesService: DataServicesService) {}
  applyDiscount(price: number, discount: number): number {
    let finalPrice: number = price - price * (discount / 100);
    return finalPrice;
  }
}
