import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalpriceService {
  TOTAL_PRICE: number = 0
  constructor() { }

  increaseTotalPrice(price: number) {
    this.TOTAL_PRICE = this.TOTAL_PRICE + Number(price)
  }

  decreaseTotalPrice(price: number) {
    this.TOTAL_PRICE = this.TOTAL_PRICE - Number(price)
  }

  getTotalPrice(): number {
    return this.TOTAL_PRICE;
  }

  resetTotalPrice(): number {
    return this.TOTAL_PRICE = 0;
  }
}
