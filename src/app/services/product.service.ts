import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model'
import { WishListService } from '../services/wish-list.service'
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private product_description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

  constructor(private wishlistservice: WishListService) {
    this.createProducts();
  }

  createProducts() {
    this.products = [
      { id: 1, title: "Grinder", price: 299, image: "../../assets/images/product_images/grinder.png", product_description: this.product_description, is_favorite: this.processPromis(1) },
      { id: 2, title: 'Camera', price: 329, image: "../../assets/images/product_images/camera.webp", product_description: this.product_description, is_favorite: this.processPromis(2) },
      { id: 3, title: 'Head Phones', price: 129, image: "../../assets/images/product_images/headphones.jpeg", product_description: this.product_description, is_favorite: this.processPromis(3) },
      { id: 4, title: 'Laptop', price: 29, image: "../../assets/images/product_images/laptop.jpeg", product_description: this.product_description, is_favorite: this.processPromis(4) },
      { id: 5, title: 'Nivea', price: 29, image: "../../assets/images/product_images/nivea.jpeg", product_description: this.product_description, is_favorite: this.processPromis(5) },
      { id: 6, title: 'Sandals', price: 529, image: "../../assets/images/product_images/sandals.jpeg", product_description: this.product_description, is_favorite: this.processPromis(6) },
      { id: 7, title: 'Watch', price: 29, image: "../../assets/images/product_images/watch.jpeg", product_description: this.product_description, is_favorite: this.processPromis(7) },
      { id: 8, title: 'Watch', price: 29, image: "../../assets/images/product_images/watch.jpeg", product_description: this.product_description, is_favorite: this.processPromis(8) },
    ];
  }

  productsDatabase(): Product[] {
    return this.products;
  }

  processPromis(pid: any): boolean {
    let is_favorite = false;
    let s = this.wishlistservice.getProductFromWishtListForHeart(pid);
    console.log(s);
    return true;
  }

  getProduct(product_id: number): any {
    for (let product of this.products) {
      if (product.id === product_id) {
        return product;
      }
    }
    return null;
  }
}
