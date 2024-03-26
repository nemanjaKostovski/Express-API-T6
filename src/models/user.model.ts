import mongoose, { Schema, Document } from 'mongoose';

export interface UserEntity extends Document {
  // email: string;
  // password: string;
  // role: 'admin' | 'user';
  id: string;
}

const UserSchema = new Schema({
  id: { type: String, required: true },
});

export default mongoose.model<UserEntity>('User', UserSchema);
