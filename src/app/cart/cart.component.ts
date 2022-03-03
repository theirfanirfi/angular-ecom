import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service'
import { Router } from '@angular/router';
import { Cart } from '../models/cart.model'
import { CartService } from '../services/cart.service'
import { TotalpriceService } from '../services/totalprice.service'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  number_of_products_in_cart: number = 0;
  cart: Cart[] = [];
  total_cart_price: number = 0;
  count: number = 1;
  constructor(private auth: AuthServiceService, private router: Router, private cartservice: CartService, private totalprice: TotalpriceService) {

  }

  ngOnInit(): void {
    this.number_of_products_in_cart = this.cartservice.getCartCount();
    this.cart = this.cartservice.getCart();
    this.total_cart_price = this.totalprice.getTotalPrice();
  }

  removeFromCart(cart: Cart) {
    this.cartservice.removeFromCart(cart);
    this.ngOnInit();
  }

  onProductQuanityChange(cart: Cart, event: any) {
    let numberOfProducts = event.target.value;
    this.cartservice.increaseNumberOfProductsInCart(cart, numberOfProducts);
    this.total_cart_price = this.totalprice.getTotalPrice();
    // this.ngOnInit();
  }

}
