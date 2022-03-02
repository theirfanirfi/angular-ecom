import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model'
import { CartService } from '../services/cart.service'
import { ProductService } from '../services/product.service'
import { WishListService } from '../services/wish-list.service'
import { WishList } from '../models/WishList.model'
import { filter, from, map, Observable, of, switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  count: number = 0;
  wishes: Observable<WishList[]>;
  products: Product[] = [];
  constructor(private cart: CartService, private productService: ProductService, private wishlist: WishListService) {
    this.wishes = this.wishlist.getWishes();
  }

  ngOnInit(): void {
    this.wishes.forEach((wish) => {
      wish.forEach(w => {
        console.log(w);
        this.products.push(this.productService.getProduct(w.product_id))
      })
    })
  }

  removeFromWishList(product: Product) {
    this.wishlist.removeFromWishList(product.id)
  }

  addToCart(product: Product): void {
    this.cart.addToCart(product, Number(this.count));
    alert('Product added to cart');
  }

}
