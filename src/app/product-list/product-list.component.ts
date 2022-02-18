import { Component, OnInit } from '@angular/core';
import {Product} from '../product/Product'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = [
    {id: 1, title: "Women Hot Collection", price: 29, image: ""},
    {id: 2, title: 'Awesome Pink Show', price: 29, image: ''},
    {id: 3, title: 'Awesome Bags Collection', price: 29, image: ''},
    {id: 4, title: 'Women Pant Collectons', price: 29, image: ''},
    {id: 5, title: 'Awesome Cap For Women', price: 29, image: ''},
    {id: 6, title: 'Polo Dress For Women', price: 29, image: ''},
    {id: 7, title: 'Black Sunglass For Women', price: 29, image: ''},
    {id: 8, title: 'Women Pant Collectons', price: 29, image: ''},
  ];

  customer = "Irfan";

  constructor() { 
  }

  ngOnInit(): void {
  }

  addToCart(){
    alert('Product added to cart');
  }

}
