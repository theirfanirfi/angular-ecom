import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router'
import { Product } from '../models/Product.model'
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../services/product.service'
import { CartService } from '../services/cart.service'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product = { id: 0, title: '', image: '', price: 0 };
  count: number = 1;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.product = this.productService.getProduct(parseInt(id));
  }

  addToCart() {
    this.cartService.addToCart(this.product, Number(this.count));
  }
}
