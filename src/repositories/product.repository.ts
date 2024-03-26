import { Model } from 'mongoose';
import { ProductEntity } from '../models/product.model';
import Product from '../models/product.model';

class ProductRepository {
  private static productModel: Model<ProductEntity>;

  static async initModel(): Promise<void> {
    this.productModel = Product;
  }

  static async getAllProducts(): Promise<ProductEntity[]> {
    try {
      const products = await this.productModel.find();
      return products;
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  }

  static async getProductById(
    productId: string
  ): Promise<ProductEntity | null> {
    try {
      const product = await this.productModel.findById(productId);
      return product;
    } catch (error) {
      console.error(`Error fetching product by ID ${productId}:`, error);
      throw error;
    }
  }
}

export default ProductRepository;
