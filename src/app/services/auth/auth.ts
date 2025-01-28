import { ApiError, ApiSuccess, AuthMessages, ICreateUser } from '../../utils/index.js';
import { UserCRUDService } from '../index.js';
import { logging } from '../../../config/decorators/log.js';

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
        newUser = await UserCRUDService.create(body);
      }
      else {
        throw AuthMessages.USER_ALREADY_EXISTS
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
      console.log(body)

      return ApiSuccess.format({
        userMessage: AuthMessages.SIGN_IN_SUCCESS.message,
        code: AuthMessages.SIGN_IN_SUCCESS.code,
        keyName: 'data',
        // ['data']: data,
      });
    } catch (error) {
      console.error('Error in signIn:', error);
      throw ApiError.format(error, AuthMessages.SIGN_IN_FAILURE);
    }
  }
}

export default new AuthService();
