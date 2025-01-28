import {
  IGetEntity,
  IGetEntityList,
  UserMessages,
  ApiError,
  ApiSuccess,
  ICreateUser,
  userCreationMapper,
} from '../../utils/index.js';
import { logging } from '../../../config/decorators/index.js';
import { UserRepository } from '../../models/repositories/index.js';

class UserCrudsService extends UserRepository {
  @logging()
  async create(args: ICreateUser): Promise<IAPISuccessResponse> {
    try {
      const createdUser: ICreateUser = await this.createOne(await userCreationMapper(args));
      return ApiSuccess.format({
        userMessage: UserMessages.DATA_FETCHED.message,
        code: UserMessages.DATA_FETCHED.code,
        keyName: 'data',
        ['data']: createdUser,
      });
    } catch (error) {
      throw ApiError.format(error, UserMessages.FETCHING_FAILURE);
    }
  }

  @logging()
  async list(args: IGetEntityList): Promise<IAPISuccessResponse> {
    try {
      const data: any = await this.find(args);
      return ApiSuccess.format({
        userMessage: UserMessages.DATA_FETCHED.message,
        code: UserMessages.DATA_FETCHED.code,
        keyName: 'data',
        ['data']: data.data,
        pagination: data.pagination,
      });
    } catch (error: any) {
      throw ApiError.format(error, UserMessages.FETCHING_FAILURE);
    }
  }

  @logging()
  async readById(args: IGetEntity): Promise<IAPISuccessResponse> {
    try {
      const data: any = await this.findOne(args);
      return ApiSuccess.format({
        userMessage: UserMessages.SINGLE_USER_DATA_FETCHED.message,
        code: UserMessages.SINGLE_USER_DATA_FETCHED.code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(error, UserMessages.FETCHING_FAILURE);
    }
  }

  @logging()
  async updateById(userId: number, args: any) {
    try {
      const data: any = await this.updateOne(userId, args);

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

  @logging()
  async deleteById(userId: string): Promise<IAPISuccessResponse> {
    try {
      const data: any = await this.deleteOne(userId);

      if (data.affected > 0) {
        return ApiSuccess.format({
          userMessage: UserMessages.USER_DELETED.message,
          code: UserMessages.USER_DELETED.code,
          keyName: 'data',
          ['data']: data.raw,
        });
      } else {
        throw UserMessages.USER_NOT_DELETED;
      }
    } catch (error: any) {
      throw ApiError.format(error, UserMessages.USER_NOT_DELETED);
    }
  }
}
export default new UserCrudsService();
