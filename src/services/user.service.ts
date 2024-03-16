import { UserEntity } from '../types';
import UserRepository from '../repositories/user.repository';

class UserService {
  static async getUserById(userId: string): Promise<UserEntity | null> {
    try {
      // Call the ProductRepository to fetch product by ID
      const user = await UserRepository.getUserById(userId);
      return user || null;
    } catch (error) {
      // Handle errors
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw new Error(`Failed to fetch user with ID ${userId}`);
    }
  }
}

export default UserService;
