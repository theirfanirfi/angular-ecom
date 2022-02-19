import { Product } from '../models/Product.model';

export interface Cart {
    id: number,
    product: Product,
    number_of_products: number,
}