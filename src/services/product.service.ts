//  This file will contain the business logic related to products. It will handle operations such as fetching products, creating new products, updating products, and deleting products. The service layer acts as an intermediary between the controller (which receives requests from clients) and the repository (which interacts with the data storage).
import { ProductEntity } from '../models/product.model';
import ProductRepository from '../repositories/product.repository';

class ProductService {
  static async getAllProducts(): Promise<ProductEntity[]> {
    try {
      // Call the ProductRepository to fetch all products
      const products = await ProductRepository.getAllProducts();
      return products;
    } catch (error) {
      // Handle errors
      console.error('Error fetching all products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  static async getProductById(
    productId: string
  ): Promise<ProductEntity | undefined> {
    try {
      // Call the ProductRepository to fetch product by ID
      const product = await ProductRepository.getProductById(productId);
      if (!product) {
        return undefined;
      }
      return product;
    } catch (error) {
      // Handle errors
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw new Error(`Failed to fetch product with ID ${productId}`);
    }
  }
}

export default ProductService;
