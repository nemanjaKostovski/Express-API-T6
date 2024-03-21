import { CartEntity } from '../types';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

class CartRepository {
  private static readonly DB_FILE_PATH = './src/repositories/database.json';

  private static carts: CartEntity[] = [];

  // Load carts data from database.json file
  private static loadCartsData(): void {
    try {
      const data = fs.readFileSync(this.DB_FILE_PATH, 'utf-8');
      const jsonData = JSON.parse(data);
      this.carts = jsonData.carts || [];
    } catch (error) {
      console.error('Error loading carts data:', error);
      throw new Error('Failed to load carts data');
    }
  }

  // Save carts data to database.json file
  private static saveCartsData(): void {
    try {
      const jsonData = {
        ...JSON.parse(fs.readFileSync(this.DB_FILE_PATH, 'utf-8')),
        carts: this.carts,
      };
      fs.writeFileSync(this.DB_FILE_PATH, JSON.stringify(jsonData, null, 2));
    } catch (error) {
      console.error('Error saving carts data:', error);
      throw new Error('Failed to save carts data');
    }
  }

  static async getCartByUserId(
    userId: string
  ): Promise<CartEntity | undefined> {
    this.loadCartsData();
    try {
      const cart = this.carts.find(
        (cart) => cart.userId === userId && !cart.isDeleted
      );

      if (cart?.isDeleted) {
        return undefined;
      }

      if (cart) {
        return cart;
      }

      return await this.createCart(userId);
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw new Error('Failed to fetch cart');
    }
  }

  static async createCart(userId: string): Promise<CartEntity> {
    this.loadCartsData();
    try {
      // Check if the user already has a cart
      const existingCart = this.carts.find(
        (cart) => cart.userId === userId && !cart.isDeleted
      );

      // If a cart already exists, return it
      if (existingCart) {
        return existingCart;
      }

      // Create a new cart if one doesn't exist
      const newCart: CartEntity = {
        id: uuidv4(),
        userId,
        isDeleted: false,
        items: [],
      };
      this.carts.push(newCart);
      this.saveCartsData();
      return newCart;
    } catch (error) {
      console.error('Error creating cart:', error);
      throw new Error('Failed to create cart');
    }
  }

  static async updateCart(
    updatedCart: CartEntity
  ): Promise<CartEntity | undefined> {
    this.loadCartsData();
    try {
      const index = this.carts.findIndex((cart) => cart.id === updatedCart.id);
      if (index === -1) {
        throw new Error('Cart not found');
      }
      this.carts[index] = updatedCart;
      this.saveCartsData();
      return updatedCart;
    } catch (error) {
      console.error('Error updating cart:', error);
      throw new Error('Failed to update cart');
    }
  }

  static async deleteCart(userId: string): Promise<boolean> {
    try {
      this.loadCartsData();
      const index = this.carts.findIndex(
        (cart) => cart.userId === userId && !cart.isDeleted
      );

      if (index === -1) {
        throw new Error('Cart not found');
      }

      // Mark the cart as deleted if it's not already
      if (!this.carts[index].isDeleted) {
        this.carts[index].isDeleted = true;
        this.saveCartsData();
      }

      return true;
    } catch (error) {
      console.error('Error deleting cart:', error);
      throw new Error('Failed to delete cart');
    }
  }
}

export default CartRepository;
