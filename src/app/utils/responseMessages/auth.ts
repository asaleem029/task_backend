import { StatusCodes } from 'http-status-codes';

export const USER_ALREADY_EXISTS = Object.freeze({
  message: 'User already exists. Choose a different email address.',
  code: StatusCodes.CONFLICT,
});

export const SIGN_UP_SUCCESS = Object.freeze({
  message: 'SIGN_UP_SUCCESS',
  code: StatusCodes.OK,
});

export const SIGN_UP_FAILURE = Object.freeze({
  message: 'Sign-up failure. Unable to create a new user account.',
  code: StatusCodes.NOT_ACCEPTABLE,
});

export const SIGN_IN_SUCCESS = Object.freeze({
  message: 'SIGN_IN_SUCCESS',
  code: StatusCodes.OK,
});

export const SIGN_IN_FAILURE = Object.freeze({
  message: 'Sign-in failure. Unable to sign in due to some reason.',
  code: StatusCodes.NOT_ACCEPTABLE,
});

export const INVALID_USER = Object.freeze({
  message: 'Invalid user or user not found.',
  code: StatusCodes.BAD_REQUEST,
});

export const INVALID_CREDENTIALS = Object.freeze({
  message: 'INVALID_CREDENTIALS',
  code: StatusCodes.BAD_REQUEST,
});

export const USER_DETAILS = Object.freeze({
  message: 'USER_DETAILS',
  code: StatusCodes.OK,
});

export const USER_DETAIL_FOUND = Object.freeze({
  message: 'USER_DETAIL_FOUND',
  code: StatusCodes.NOT_FOUND,
});
