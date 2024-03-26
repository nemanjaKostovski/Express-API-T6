import mongoose, { Schema, Document } from 'mongoose';
import { CartItemEntity, CartItemSchema } from './cartItem.model';

export interface CartEntity extends Document {
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

const CartSchema = new Schema({
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
  items: [{ type: CartItemSchema, required: true }],
});

export default mongoose.model<CartEntity>('Cart', CartSchema);
