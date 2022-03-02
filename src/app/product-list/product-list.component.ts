import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model'
import { CartService } from '../services/cart.service'
import { ProductService } from '../services/product.service'
import { WishListService } from '../services/wish-list.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  count: number = 1;

  constructor(private cart: CartService, productService: ProductService, private wishlist: WishListService) {
    this.products = productService.productsDatabase();
  }

  ngOnInit(): void {
    // console.log(this.products[this.products.length - 1]);
  }

  addToCart(product: Product): void {
    this.cart.addToCart(product, Number(this.count));
    alert('Product added to cart');
  }

  addToWishList(product: Product): void {
    this.wishlist.addToWishList(Number(product.id));
    // alert('Product added to wishtlist.');
  }

}
