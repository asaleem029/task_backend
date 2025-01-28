import { API_ROUTE, MS_BASE_PATH } from './base.js';
const BASE = MS_BASE_PATH + API_ROUTE + '/user';

const CREATE = '';
const GET_ALL = '';
const GET_BY_ID = ':id';
const UPDATE_BY_ID = ':id';
const DELETE = ':id';

export { BASE, GET_ALL, DELETE, GET_BY_ID, CREATE, UPDATE_BY_ID };
