// This file will handle the interaction with the data storage for products. It will contain functions to perform database operations like querying for products, inserting new products, updating existing products, and deleting products. In this case, since we're using a file-based data storage, it might involve reading from and writing to JSON files.
// product.repository.ts

import { ProductEntity } from '../types';
import * as database from './database.json'; // Import database.json

class ProductRepository {
  private static products: ProductEntity[] = database.products;

  static async getAllProducts(): Promise<ProductEntity[]> {
    return this.products;
  }

  static async getProductById(
    productId: string
  ): Promise<ProductEntity | null> {
    const product = this.products.find((p) => p.id === productId);
    return product || null;
  }
}

export default ProductRepository;
