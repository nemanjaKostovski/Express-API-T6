import mongoose, { Schema, Document } from 'mongoose';
import { ProductEntity, ProductSchema } from './product.model';

export interface CartItemEntity extends Document {
  product: ProductEntity;
  count: number;
}

export const CartItemSchema = new Schema({
  product: {
    type: ProductSchema,
    required: true,
  },
  count: { type: Number, required: true },
});

export default mongoose.model<CartItemEntity>('Cart Item', CartItemSchema);
