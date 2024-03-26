import { Model } from 'mongoose';
import { UserEntity } from '../models/user.model';
import User from '../models/user.model';

class UserRepository {
  private static userModel: Model<UserEntity>;

  static async initModel(): Promise<void> {
    this.userModel = User;
  }

  static async getUserById(userId: string): Promise<UserEntity | null> {
    try {
      const user = await this.userModel.findById(userId);
      return user;
    } catch (error) {
      console.error('Error retrieving user by ID:', error);
      throw error;
    }
  }
}

export default UserRepository;
