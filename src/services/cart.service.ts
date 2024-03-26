import { CartEntity } from '../models/cart.model';
import { CartItemEntity } from '../models/cartItem.model';
import CartRepository from '../repositories/cart.repository';
import ProductService from './product.service';
import { OrderEntity } from '../models/order.model';
import Order from '../models/order.model';

class CartService {
  static async getOrCreateUserCart(userId: string): Promise<CartEntity> {
    // Check if the user already has a cart
    console.log('CS get or create ' + userId);
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
      console.log('CS update cart ' + userId);
      let cart = await CartRepository.getCartByUserId(userId);

      if (!cart) {
        return undefined; // Cart not found
      }

      const product = await ProductService.getProductById(productId);

      if (!product) {
        throw new Error('Product not found');
      }

      // @ts-ignore
      const itemToAdd: CartItemEntity = {
        product: product,
        count: count,
      };

      const index = cart.items.findIndex(
        (item) => item.product.id === productId
      );

      if (index !== -1) {
        cart.items[index].count += count;
      } else {
        cart.items.push(itemToAdd);
      }

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
      console.log('CS empty cart ' + userId);
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
    try {
      // Retrieve the cart associated with the user
      console.log('CS checkout cart ' + userId);
      const cart = await CartRepository.getCartByUserId(userId);

      // Check if the cart exists and if it has items
      if (!cart || cart.items.length === 0) {
        throw new Error('Cart is empty');
      }

      // Calculate the total based on the items in the cart
      const total = cart.items.reduce((acc: number, item: CartItemEntity) => {
        return acc + item.product.price * item.count;
      }, 0);

      // Create the order object with necessary details
      const orderData = {
        userId: userId,
        cartId: cart._id, // Assuming _id is the cart identifier
        items: cart.items,
        status: 'created',
        total: total,
        ...orderDetails,
      };

      // Create a new Order instance
      const order = new Order(orderData);

      // Save the order to the database
      const savedOrder = await order.save();

      // Clear the cart after checkout
      await CartRepository.deleteCart(userId);

      return savedOrder;
    } catch (error) {
      console.error('Error checking out user cart:', error);
      throw new Error('Failed to checkout cart');
    }
  }
}

export default CartService;
