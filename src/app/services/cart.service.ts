import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  total_price: number = 0;
  cart: Cart[] = [];

  constructor() { }

  returnProductIfExists(product: Product): any {
    let i = 0;
    for (let c of this.cart) {
      if (c.product.id === product.id) {
        return i;
      }
      i++;
    }
    return null;
  }

  assignIndex(): number {
    if (this.cart.length > 0) {
      return this.cart[this.cart.length - 1].id + 1;
    } else {
      return 1;
    }
  }

  addToCart(product: Product, number_of_products: number): boolean {
    let existing_product_index = this.returnProductIfExists(product);
    if (existing_product_index == null) {
      this.cart?.push({
        id: this.assignIndex(),
        product: product,
        number_of_products: Number(number_of_products),
      });
      console.log(this.cart);
      return true;
    } else {
      this.cart.splice(existing_product_index, 1);
      this.cart.push({
        id: 1,
        product: product,
        number_of_products: number_of_products,
      });

      console.log(this.cart);
      return true;
    }
  }

  removeFromCart(cart: Cart) {
    let index = this.returnProductIfExists(cart.product);
    this.cart.splice(index, 1);
  }

  incrementProduct(product: Product) { }

  decrementProduct(product: Product) { }

  getCartCount(): number {
    return this.cart.length;
  }

  getCart(): Cart[] {
    return this.cart;
  }
}
