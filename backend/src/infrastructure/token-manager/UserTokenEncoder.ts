import { sign } from 'jsonwebtoken';
import User from '@domain/entities/User';
import IUserTokenEncoder from '@domain/interfaces/token-manager/IUserTokenEncoder';
import 'dotenv/config';

export default class UserTokenEncoder implements IUserTokenEncoder {
  encode(user: User, expiresIn: number): string {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const { id, accountId, username } = user.toDTO();

    return sign({ id, accountId, username }, secret, { expiresIn });
  }
}