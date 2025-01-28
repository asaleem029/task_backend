import jwt from 'jsonwebtoken';
import { ApiError, ApiSuccess, AuthMessages } from '../utils/index.js';
import { StatusCodes } from 'http-status-codes';

const VALIDATE_TOKEN = async (token: any, secret: any): Promise<IAPISuccessResponse> => {
  try {
    const TOKEN = jwt.verify(token, secret);

    return ApiSuccess.format({
      message: 'Token Validated',
      code: StatusCodes.OK,
      keyName: 'token',
      ['token']: TOKEN,
    });
  } catch (error: any) {
    throw ApiError.format({
      message: AuthMessages.INVALID_TOKEN.message,
      code: AuthMessages.INVALID_TOKEN.code,
    });
  }
};

export { VALIDATE_TOKEN as ValidateToken };
