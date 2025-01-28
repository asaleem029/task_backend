import { ICreateUser, IUpdateUser, UserMessages } from '../../utils/index.js';
import { logging } from '../../../config/decorators/index.js';
import { ApiError, ApiSuccess } from '../../utils/index.js';
import { UserCRUDService } from './index.js';
import { BcryptService } from '../index.js';

class UserService {
  @logging()
  async userCreation(body: ICreateUser): Promise<IAPISuccessResponse> {
    try {
      const users = await UserCRUDService.list({
        email: body.email,
        requestUrl: '',
      });

      if (users[users.keyName].length > 0) {
        throw UserMessages.USER_ALREADY_EXISTS;
      }

      const passwordHash = await BcryptService.hashPassword(body.password);
      body.password = passwordHash;

      const createdUser = await UserCRUDService.create(body);

      return ApiSuccess.format({
        userMessage: UserMessages.USER_CREATED.message,
        code: UserMessages.USER_CREATED.code,
        keyName: 'data',
        ['data']: createdUser,
      });
    } catch (error) {
      throw ApiError.format(error, UserMessages.FETCHING_FAILURE);
    }
  }

  @logging()
  async updateUser(userId: number, args: IUpdateUser) {
    try {
      const { email, ...updateParams } = args;
      const data: any = await UserCRUDService.updateOne(
        {
          id: userId,
          email: email,
        },
        updateParams,
      );

      if (data.affected > 0) {
        return ApiSuccess.format({
          userMessage: UserMessages.USER_UPDATED.message,
          code: UserMessages.USER_UPDATED.code,
          keyName: 'data',
          ['data']: data.raw,
        });
      } else {
        throw UserMessages.UPDATING_FAILURE;
      }
    } catch (error: any) {
      throw ApiError.format(error, UserMessages.UPDATING_FAILURE);
    }
  }
}
export default new UserService();
