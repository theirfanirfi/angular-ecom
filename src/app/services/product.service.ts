import { Injectable } from '@angular/core';
import {Product} from '../models/Product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  constructor() { 
    this.createProducts();
  }

  createProducts(){
    this.products = [
      {id: 1, title: "Hot Collection", price: 299, image: ""},
    {id: 2, title: 'Awesome Pink Show', price: 329, image: ''},
    {id: 3, title: 'Awesome Bags Collection', price: 129, image: ''},
    {id: 4, title: 'Women Pant Collectons', price: 29, image: ''},
    {id: 5, title: 'Awesome Cap For Women', price: 29, image: ''},
    {id: 6, title: 'Polo Dress For Women', price: 529, image: ''},
    {id: 7, title: 'Black Sunglass For Women', price: 29, image: ''},
    {id: 8, title: 'Women Pant Collectons', price: 629, image: ''},
    ];
  }

  productsDatabase(): Product[] {
    return this.products;
  }

  getProduct(product_id: number):any {
    for(let product of this.products){
      if(product.id === product_id){
        return product;
      }
    }
    return null;
  }
}
