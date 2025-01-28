import {
  ApiError,
  ApiSuccess,
  AuthMessages,
  ICreateUser,
  TOKEN_SECRET,
} from '../../utils/index.js';
import { BcryptService, UserCRUDService } from '../index.js';
import { logging } from '../../../config/decorators/log.js';
import { CreateToken } from '../../helpers/createToken.js';

class AuthService {
  @logging()
  async signUp(body: ICreateUser): Promise<IAPISuccessResponse> {
    try {
      const user = await UserCRUDService.list({
        email: body.email,
        requestUrl: '',
      });

      let newUser;
      if (user[user.keyName].length === 0) {
        const passwordHash = await BcryptService.hashPassword(body.password);
        body.password = passwordHash;
        newUser = await UserCRUDService.create(body);
      } else {
        throw AuthMessages.USER_ALREADY_EXISTS;
      }

      return ApiSuccess.format({
        userMessage: AuthMessages.SIGN_UP_SUCCESS.message,
        code: AuthMessages.SIGN_UP_SUCCESS.code,
        keyName: 'data',
        ['data']: newUser,
      });
    } catch (error) {
      console.error('Error in signIn:', error);
      throw ApiError.format(error, AuthMessages.SIGN_UP_FAILURE);
    }
  }

  @logging()
  async signIn(body: any): Promise<IAPISuccessResponse> {
    try {
      const data = {
        token: '',
        user: '',
      };

      // GET USER DETAILS
      const user = await UserCRUDService.list({
        email: body.email,
        requestUrl: '',
      });

      // VALIDATING USER DETAILS
      if (user[user.keyName].length > 0) {
        const hashedPassword = user[user.keyName][0].password;
        const isValidPassword = await BcryptService.comparePassword(body.password, hashedPassword);

        // VALIDATING USER PASSWORD
        if (!isValidPassword) {
          throw AuthMessages.INVALID_CREDENTIALS;
        }

        // CREATING PAYLOAD FOR JWT TOKEN
        const tokenPayload = {
          firstName: user[user.keyName][0].firstName,
          lastName: user[user.keyName][0].lastName,
          email: user[user.keyName][0].email,
          userId: user[user.keyName][0].id,
        };

        // CREATING JWT TOKEN
        const token = await CreateToken(tokenPayload, TOKEN_SECRET);

        // JWT TOKEN RESPONSE
        if (token.success) {
          data.token = token.token;
          data.user = user[user.keyName][0];
        }
      } else {
        throw AuthMessages.INVALID_USER;
      }

      return ApiSuccess.format({
        userMessage: AuthMessages.SIGN_IN_SUCCESS.message,
        code: AuthMessages.SIGN_IN_SUCCESS.code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error) {
      console.error('Error in signIn:', error);
      throw ApiError.format(error, AuthMessages.SIGN_IN_FAILURE);
    }
  }
}

export default new AuthService();
