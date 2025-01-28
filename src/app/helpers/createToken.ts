// import { SignOptions, sign } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { ApiError, ApiSuccess, JwtSettings } from '../utils/index.js';
import { StatusCodes } from 'http-status-codes';

const CREATE_TOKEN = async (user: any, secret: any): Promise<IAPISuccessResponse> => {
  try {
    const TOKEN = jwt.sign(user, secret as string, {
      algorithm: JwtSettings.ALGORITHM as any,
      expiresIn: JwtSettings.TOKEN_EXPIRY as string,
    });

    return ApiSuccess.format({
      message: 'Token Created',
      code: StatusCodes.OK,
      keyName: 'token',
      ['token']: TOKEN,
    });
  } catch (error: any) {
    throw ApiError.format({
      message: error.message,
      code: StatusCodes.NOT_FOUND,
    });
  }
};

export { CREATE_TOKEN as CreateToken };
