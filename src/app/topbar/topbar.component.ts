import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service'
import { Router } from '@angular/router';
import { Cart } from '../models/cart.model'
import { CartService } from '../services/cart.service'
import { ProfileUser } from '../models/User.model';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  number_of_products_in_cart: number = 0;
  cart: Cart[] = [];
  user?: ProfileUser;
  isLoggedIn: boolean = false

  constructor(private auth: AuthServiceService, private router: Router, private cartservice: CartService) {
    this.user = this.auth.getUserInfo();
  }

  ngOnInit(): void {

    try {
      if (this.user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;

      }
    } catch (e) {
      this.isLoggedIn = false;

    }

    this.number_of_products_in_cart = this.cartservice.getCartCount();
    this.cart = this.cartservice.getCart();
  }

  removeFromCart(cart: Cart) {
    this.cartservice.removeFromCart(cart);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
