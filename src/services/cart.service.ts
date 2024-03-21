import { CartEntity } from '../types';
import CartRepository from '../repositories/cart.repository';
import ProductService from './product.service';

class CartService {
  static async getOrCreateUserCart(userId: string): Promise<CartEntity> {
    // Check if the user already has a cart
    let cart = await CartRepository.getCartByUserId(userId);

    // If the user doesn't have a cart, create a new one
    if (!cart) {
      cart = await CartRepository.createCart(userId);
    }

    return cart;
  }

  static async updateCart(
    userId: string,
    productId: string,
    count: number
  ): Promise<CartEntity | undefined> {
    try {
      // Retrieve the existing cart object for the given user ID from the repository
      let cart = await CartRepository.getCartByUserId(userId);

      if (!cart) {
        return undefined; // Cart not found
      }

      // Find the product with the specified ID from the list of products
      const product = await ProductService.getProductById(productId);

      if (!product) {
        throw new Error('Product not found');
      }

      // Find the index of the product in the cart's items array
      const index = cart.items.findIndex(
        (item) => item.product.id === productId
      );

      if (index !== -1) {
        // If the product already exists in the cart, update its count
        cart.items[index].count += count;
      } else {
        // If the product is not already in the cart, add it to the items array
        cart.items.push({ product, count });
      }

      // Save the updated cart object in the repository
      const updatedCart = await CartRepository.updateCart(cart);

      return updatedCart;
    } catch (error) {
      console.error('Error updating user cart:', error);
      throw new Error('Failed to update user cart');
    }
  }

  static async emptyCart(userId: string): Promise<boolean> {
    try {
      // Check if the user has a cart
      const cart = await CartRepository.getCartByUserId(userId);

      if (!cart) {
        return false; // Cart not found
      }

      // If the cart is already deleted, return true indicating success
      if (cart.isDeleted) {
        return true;
      }

      // Mark the cart as deleted
      const success = await CartRepository.deleteCart(userId);

      return success;
    } catch (error) {
      console.error('Error emptying user cart:', error);
      throw new Error('Failed to empty user cart');
    }
  }

  static async checkoutCart(userId: string, orderDetails: any): Promise<any> {
    // You can implement the logic to create an order from the cart here
    // This could involve creating a new order entity, updating inventory, etc.
    // For simplicity, let's just return the cart as the order for now
    const cart = await CartRepository.getCartByUserId(userId);

    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    // Mocking the order creation process
    const order = {
      ...cart,
      status: 'created',
      total: 0, // Calculate total based on cart items
      ...orderDetails,
    };

    // Clear the cart after checkout
    await CartRepository.deleteCart(userId);

    return order;
  }
}

export default CartService;
