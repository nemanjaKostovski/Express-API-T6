import { UserEntity } from '../types';
import * as database from './database.json'; // Import database.json

class UserRepository {
  private static users: UserEntity[] = database.users;

  static getUserById(userId: string): UserEntity | undefined {
    return this.users.find((user) => user.id === userId);
  }
}

export default UserRepository;
