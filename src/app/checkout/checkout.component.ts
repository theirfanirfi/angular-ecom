import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart.model'
import { CartService } from '../services/cart.service'
import { TotalpriceService } from '../services/totalprice.service'
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  total_cart_price: number = 0;
  constructor(private cartservice: CartService, private totalprice: TotalpriceService) { }

  ngOnInit(): void {
    this.total_cart_price = this.totalprice.getTotalPrice();
  }

}
