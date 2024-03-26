import { Request, Response, NextFunction } from 'express';
import { UserEntity } from '../models/user.model';
import UserService from '../services/user.service';

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity; // Define the user property
      isAdmin?: boolean; // Define the isAdmin property
    }
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.header('x-user-id');

  console.log('auth middleware ' + userId);

  if (!userId) {
    return res
      .status(401)
      .json({ data: null, error: { message: 'Token is not provided' } });
  }

  try {
    const user = await UserService.getUserById(userId);

    if (!user) {
      return res
        .status(403)
        .json({ data: null, error: { message: 'User does not exist' } });
    }

    req.user = user;
    req.isAdmin = true;

    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res
      .status(500)
      .json({ data: null, error: { message: 'Internal Server error' } });
  }
}
