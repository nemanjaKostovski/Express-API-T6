import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  static async getUserById(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      const user = await UserService.getUserById(userId);

      if (user) {
        return res.status(200).json({ data: user, error: null });
      } else {
        return res
          .status(404)
          .json({ data: null, error: { message: 'No user with such id' } });
      }
    } catch (error) {
      console.error('Error fetching user with id', error);
      return res
        .status(500)
        .json({ data: null, error: { message: 'Internal Server error' } });
    }
  }
}

export default UserController;
