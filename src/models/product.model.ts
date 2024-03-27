import mongoose, { Schema, Document } from 'mongoose';

export interface ProductEntity extends Document {
  title: string;
  description: string;
  price: number;
}

export const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

export default mongoose.model<ProductEntity>('Product', ProductSchema);
