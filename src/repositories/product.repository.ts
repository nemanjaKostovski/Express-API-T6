// This file will handle the interaction with the data storage for products. It will contain functions to perform database operations like querying for products, inserting new products, updating existing products, and deleting products. In this case, since we're using a file-based data storage, it might involve reading from and writing to JSON files.
import { ProductEntity } from '../types';

class ProductRepository {
  private static products: ProductEntity[] = [
    {
      id: '1',
      title: 'Book',
      description: 'A very interesting book',
      price: 100,
    },
    {
      id: '2',
      title: 'Pen',
      description: 'A useful pen',
      price: 20,
    },
  ];

  static async getAllProducts(): Promise<ProductEntity[]> {
    // Simulate asynchronous operation
    return new Promise((resolve) => {
      // Return the list of products
      resolve(ProductRepository.products);
    });
  }

  static async getProductById(
    productId: string
  ): Promise<ProductEntity | null> {
    // Simulate asynchronous operation
    return new Promise((resolve) => {
      // Find the product with the specified ID
      const product = ProductRepository.products.find(
        (p) => p.id === productId
      );

      // Return the product if found, otherwise return null
      resolve(product || null);
    });
  }
}

export default ProductRepository;
