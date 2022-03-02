import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';
import { Cart } from '../models/cart.model';
import { TotalpriceService } from '../services/totalprice.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  total_price: number = 0;
  cart: Cart[] = [];

  constructor(private totalpriceService: TotalpriceService) { }

  returnProductIfExists(product: Product): number {
    let i = 0;
    for (let c of this.cart) {
      if (c.product.id === product.id) {
        return i;
      }
      i++;
    }
    return -10;
  }

  assignIndex(): number {
    if (this.cart.length > 0) {
      return this.cart[this.cart.length - 1].id + 1;
    } else {
      return 1;
    }
  }

  addToCart(product: Product, number_of_products: number): boolean {
    let index = this.returnProductIfExists(product);
    if (index == -10) {
      this.cart?.push({
        id: this.assignIndex(),
        product: product,
        number_of_products: Number(number_of_products),
      });

      this.totalpriceService.increaseTotalPrice(product.price * Number(number_of_products));

      return true;
    } else {
      let existingProduct = this.cart[index];
      this.cart.splice(index, 1);

      this.cart.push({
        id: 1,
        product: product,
        number_of_products: number_of_products,
      });

      this.totalpriceService.decreaseTotalPrice(existingProduct.number_of_products * existingProduct.product.price);
      this.totalpriceService.increaseTotalPrice(product.price * Number(number_of_products));
      console.log(this.cart);
      return true;
    }
  }

  removeFromCart(cart: Cart) {
    let index = this.returnProductIfExists(cart.product);
    this.cart.splice(index, 1);
  }


  getCartCount(): number {
    return this.cart.length;
  }

  getCart(): Cart[] {
    return this.cart;
  }
}
