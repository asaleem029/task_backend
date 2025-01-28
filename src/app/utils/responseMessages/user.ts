import { StatusCodes } from 'http-status-codes';

export const DATA_FETCHED = Object.freeze({
  message: 'USER_DATA_FETCHED',
  code: StatusCodes.OK,
});

export const USER_NOT_FOUND = Object.freeze({
  message: 'USER_NOT_FOUND',
  code: StatusCodes.NOT_FOUND,
});

export const USER_CREATED = Object.freeze({
  message: 'USER_CREATED',
  code: StatusCodes.OK,
});

export const USER_ALREADY_EXISTS = Object.freeze({
  message: 'USER_ALREADY_EXISTS',
  code: StatusCodes.BAD_REQUEST,
});

export const FETCHING_FAILURE = Object.freeze({
  message: 'FETCHING_FAILURE',
  code: StatusCodes.NOT_FOUND,
});

export const UPDATING_FAILURE = Object.freeze({
  message: 'UPDATING_FAILURE',
  code: StatusCodes.BAD_REQUEST,
});

export const SINGLE_USER_DATA_FETCHED = Object.freeze({
  message: 'SINGLE_USER_DATA_FETCHED',
  code: StatusCodes.OK,
});

export const USER_UPDATED = Object.freeze({
  message: 'USER_UPDATED',
  code: StatusCodes.OK,
});

export const YOU_DONOT_HAVE_PERMISSION_TO_UPDATE_USER = Object.freeze({
  message: 'YOU_DONOT_HAVE_PERMISSION_TO_UPDATE_USER',
  code: StatusCodes.UNAUTHORIZED,
});

export const YOU_DONOT_HAVE_PERMISSION_TO_DELETE_USER = Object.freeze({
  message: 'YOU_DONOT_HAVE_PERMISSION_TO_DELETE_USER',
  code: StatusCodes.UNAUTHORIZED,
});

export const USER_DELETED = Object.freeze({
  message: 'USER_DELETED',
  code: StatusCodes.OK,
});

export const USER_NOT_DELETED = Object.freeze({
  message: 'USER_NOT_DELETED',
  code: StatusCodes.BAD_REQUEST,
});

export const USER_DEACTIVED = Object.freeze({
  message: 'User has been successfully made inactive.',
  code: StatusCodes.OK,
});

export const USER_REACTIVATED = Object.freeze({
  message: 'User has been successfully made active.',
  code: StatusCodes.OK,
});

export const USER_DEACTIVATION_FAILED = Object.freeze({
  message: 'USER_DEACTIVATION_FAILED',
  code: StatusCodes.BAD_REQUEST,
});

export const USER_NOT_FETCHED = Object.freeze({
  message: 'USER_NOT_FETCHED',
  code: StatusCodes.BAD_REQUEST,
});

export const USER_CREATION_FOR_THIS_ROLR_NOT_ALLOWED = Object.freeze({
  message: 'USER_CREATION_FOR_THIS_ROLR_NOT_ALLOWED',
  code: StatusCodes.BAD_REQUEST,
});

export const USER_STUDENT_CREATED = Object.freeze({
  message: 'USER_STUDENT_CREATED',
  code: StatusCodes.OK,
});

export const USER_STUDENT_CREATION_FAILED = Object.freeze({
  message: 'USER_STUDENT_CREATION_FAILED',
  code: StatusCodes.BAD_REQUEST,
});

export const USER_NOT_A_STUDENT = Object.freeze({
  message: 'USER_NOT_A_STUDENT',
  code: StatusCodes.BAD_REQUEST,
});
