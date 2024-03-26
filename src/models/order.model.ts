import mongoose, { Schema, Document } from 'mongoose';
import { CartItemEntity, CartItemSchema } from './cartItem.model';

export interface OrderEntity extends Document {
  userId: string;
  cartId: string;
  items: CartItemEntity[]; // products from CartEntity
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: 'created' | 'completed';
  total: number;
}

const OrderSchema = new Schema({
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  items: [{ type: CartItemSchema, required: true }],
  payment: {
    type: { type: String },
    address: { type: String },
    creditCard: { type: String },
  },
  delivery: {
    type: { type: String },
    address: { type: String },
  },
  comments: { type: String },
  status: { type: String, required: true },
  total: { type: Number, required: true },
});

export default mongoose.model<OrderEntity>('Order', OrderSchema);
