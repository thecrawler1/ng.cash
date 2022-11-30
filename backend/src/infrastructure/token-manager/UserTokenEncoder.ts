import { sign } from 'jsonwebtoken';
import User from '@core/entities/User';
import IUserTokenEncoder, { TOKEN_EXPIRATION } from '@core/interfaces/token-manager/IUserTokenEncoder';
import 'dotenv/config';

export default class UserTokenEncoder implements IUserTokenEncoder {
  encode(user: User): string {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const { id, accountId, username } = user.toDTO();

    return sign({ id, accountId, username }, secret, { expiresIn: TOKEN_EXPIRATION });
  }
}
