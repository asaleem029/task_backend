import { StatusCodes } from 'http-status-codes';

export const DATA_FETCHED = Object.freeze({
  message: 'TASK_DATA_FETCHED',
  code: StatusCodes.OK,
});

export const TASK_NOT_FOUND = Object.freeze({
  message: 'TASK_NOT_FOUND',
  code: StatusCodes.NOT_FOUND,
});

export const TASK_CREATED = Object.freeze({
  message: 'TASK_CREATED',
  code: StatusCodes.OK,
});

export const TASK_ALREADY_EXISTS = Object.freeze({
  message: 'TASK_ALREADY_EXISTS',
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

export const TASK_UPDATED = Object.freeze({
  message: 'TASK_UPDATED',
  code: StatusCodes.OK,
});

export const TASK_DELETED = Object.freeze({
  message: 'TASK_DELETED',
  code: StatusCodes.OK,
});

export const TASK_NOT_DELETED = Object.freeze({
  message: 'TASK_NOT_DELETED',
  code: StatusCodes.BAD_REQUEST,
});

export const TASK_NOT_FETCHED = Object.freeze({
  message: 'TASK_NOT_FETCHED',
  code: StatusCodes.BAD_REQUEST,
});
