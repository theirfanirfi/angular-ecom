import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model'
import { CartService } from '../services/cart.service'
import { ProductService } from '../services/product.service'
import { WishListService } from '../services/wish-list.service'
import { WishList } from '../models/WishList.model'
import { filter, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { ProfileUser } from '../models/User.model';
import { AuthServiceService } from '../services/auth-service.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  count: number = 0;
  wishes: Observable<WishList[]>;
  products: Product[] = [];
  user?: ProfileUser;
  constructor(private cart: CartService, private productService: ProductService, private wishlist: WishListService, private auth: AuthServiceService, private router: Router) {
    this.wishes = this.wishlist.getWishes();
    this.user = this.auth.getUserInfo();
  }

  ngOnInit(): void {
    if (!this.user) {
      alert('Please login first.');
      this.router.navigate(['/login']);
    }

    this.wishes.forEach((wish) => {
      this.products = []
      console.log(wish)
      wish.forEach(w => {
        console.log(w.id);
        console.log(w.uid);
        let product = this.productService.getProduct(w.product_id);
        product == null ? "" : this.products.push(product)
      })
    })
  }

  removeFromWishList(product: Product) {
    if (!this.user) {
      alert('Please login first.');
      this.router.navigate(['/login']);
    } else {
      this.wishlist.removeFromWishList(product.id)

    }

  }

  addToCart(product: Product): void {
    try {
      if (this.user) {
        this.cart.addToCart(product, Number(this.count));
        alert('Product added to cart');
      } else {
        alert('Please login first.');
        this.router.navigate(['/login']);
      }

    } catch (err) {
      alert('Please login first.');
      this.router.navigate(['/login']);
    }


  }

}
