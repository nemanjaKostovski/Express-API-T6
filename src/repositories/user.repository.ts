import { UserEntity } from '../types';

class UserRepository {
  private static users: UserEntity[] = [
    {
      // email: 'ann.jones@epam.com',
      // password: 'ann95',
      // role: 'admin',
      id: 'fdbbb574-266b-4b2e-ad2d-790bcf4765c2',
    },
    {
      // email: 'john.doe@epam.com',
      // password: 'johnthebest',
      // role: 'admin',
      id: 'adbbb574-266b-4b2e-bd2d-790bcf4765c2',
    },
  ];
  static getUserById(userId: string): UserEntity | undefined {
    return this.users.find((user) => user.id === userId);
  }
}

export default UserRepository;
