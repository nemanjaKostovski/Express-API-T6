import { Model } from 'mongoose';
import { CartEntity } from '../models/cart.model';
import Cart from '../models/cart.model';

class CartRepository {
  private static cartModel: Model<CartEntity>;

  static async initModel(): Promise<void> {
    this.cartModel = Cart;
  }

  static async getCartByUserId(
    userId: string
  ): Promise<CartEntity | undefined> {
    try {
      console.log('CR get cart ' + userId);
      const cart = await this.cartModel.findOne({
        userId: userId,
        isDeleted: false,
      });
      if (!cart) {
        return undefined;
      }
      return cart;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw new Error('Failed to fetch cart');
    }
  }

  static async createCart(userId: string): Promise<CartEntity> {
    try {
      console.log('CR create cart ' + userId);
      const newCart = new this.cartModel({
        userId: userId,
        isDeleted: false,
        items: [],
      });
      await newCart.save();
      return newCart;
    } catch (error) {
      console.error('Error creating cart:', error);
      throw new Error('Failed to create cart');
    }
  }

  static async updateCart(
    updatedCart: CartEntity
  ): Promise<CartEntity | undefined> {
    try {
      console.log('CC empty cart ' + updatedCart._id);
      const cart = await this.cartModel.findByIdAndUpdate(
        updatedCart._id,
        updatedCart,
        { new: true }
      );

      if (!cart) {
        return undefined;
      }

      return cart;
    } catch (error) {
      console.error('Error updating cart:', error);
      throw new Error('Failed to update cart');
    }
  }

  static async deleteCart(userId: string): Promise<boolean> {
    try {
      const result = await this.cartModel.deleteOne({
        userId: userId,
        isDeleted: false,
      });
      return result.deletedCount === 1;
    } catch (error) {
      console.error('Error deleting cart:', error);
      throw new Error('Failed to delete cart');
    }
  }
}

export default CartRepository;
