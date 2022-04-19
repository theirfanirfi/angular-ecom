import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model'
import { CartService } from '../services/cart.service'
import { ProductService } from '../services/product.service'
import { WishListService } from '../services/wish-list.service'
import { ProfileUser } from '../models/User.model';
import { AuthServiceService } from '../services/auth-service.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  count: number = 1;
  user?: ProfileUser;

  constructor(private cart: CartService, productService: ProductService, private wishlist: WishListService, private auth: AuthServiceService, private router: Router) {
    this.products = productService.productsDatabase();
    this.user = this.auth.getUserInfo();
  }

  ngOnInit(): void {
    // console.log(this.products[this.products.length - 1]);
    // this.check_if_it_is_in_wishlist(3);
  }

  addToCart(product: Product): void {
    this.cart.addToCart(product, Number(this.count));
    alert('Product added to cart');
  }

  addToWishList(product: Product): void {
    try {
      if (this.user) {
        this.wishlist.addToWishList(Number(product.id));
        alert('Product added to wishtlist.');
      } else {
        alert('Please login first.');
        this.router.navigate(['/login']);
      }

    } catch (err) {
      alert('Please login first.');
      this.router.navigate(['/login']);
    }


  }

  // async check_if_it_is_in_wishlist(product_id: number): boolean {

  //   let heart = await this.wishlist.getProductFromWishtListForHeart(product_id);
  //   if (heart) {
  //     return true;
  //   }
  //   return false;
  // }

}
