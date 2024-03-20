import { Request, Response } from 'express';
import CartService from '../services/cart.service';
import { updateCartSchema } from '../schemas.joi';
import { CartItemEntity } from '../types';

class CartController {
  static async getOrCreateUserCart(req: Request, res: Response) {
    try {
      const userId = req.user?.id!;
      const cart = await CartService.getOrCreateUserCart(userId);
      return res.status(200).json({ data: cart, error: null });
    } catch (error) {
      console.error('Error getting or creating user cart:', error);
      return res
        .status(500)
        .json({ data: null, error: { message: 'Internal Server error' } });
    }
  }

  static async updateCart(req: Request, res: Response) {
    try {
      const userId = req.user?.id!;
      const { productId, count } = req.body;
      await updateCartSchema.validateAsync(req.body);
      const updatedCart = await CartService.updateCart(
        userId,
        productId,
        count
      );
      return res.status(200).json({ data: updatedCart, error: null });
    } catch (error) {
      console.error('Error updating user cart:', error);
      return res
        .status(500)
        .json({ data: null, error: { message: 'Internal Server error' } });
    }
  }

  static async emptyCart(req: Request, res: Response) {
    try {
      const userId = req.user?.id!;
      const success = await CartService.emptyCart(userId);
      return res.status(200).json({ data: { success }, error: null });
    } catch (error) {
      console.error('Error emptying user cart:', error);
      return res
        .status(500)
        .json({ data: null, error: { message: 'Internal Server error' } });
    }
  }

  static async checkoutCart(req: Request, res: Response) {
    try {
      const userId = req.user?.id!;
      const order = await CartService.checkoutCart(userId, req.body);
      const total = order.items.reduce((acc: number, item: CartItemEntity) => {
        return acc + item.product.price * item.count;
      }, 0);

      // Modify the structure of the returned order object to match the expected format
      const modifiedOrder = {
        id: order.id,
        userId: order.userId,
        cartId: order.cartId,
        items: order.items.map((item: CartItemEntity) => ({
          product: {
            id: item.product.id,
            title: item.product.title,
            description: item.product.description,
            price: item.product.price,
          },
          count: item.count,
        })),
        payment: {
          type: 'paypal',
          address: 'London',
          creditCard: '1234-1234-1234-1234',
        },
        delivery: {
          type: 'post',
          address: 'London',
        },
        comments: '',
        status: 'created',
        total: total,
      };
      return res.status(200).json({ data: { modifiedOrder }, error: null });
    } catch (error) {
      console.error('Error checking out user cart:', error);
      return res
        .status(500)
        .json({ data: null, error: { message: 'Internal Server error' } });
    }
  }
}

export default CartController;
