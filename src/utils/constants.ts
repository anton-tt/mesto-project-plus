export const SUCCESS_REQUEST = 200;
export const CREATED = 201;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const CONFLICT = 409;
export const INTERNAL_SERVER_ERROR = 500;

export const SERVER_ERROR_MESSAGE = 'Возникла непредвиденная ошибка. Пожалуйста, повторите свой запрос.';

export const CARDS_ROUT = '/cards';
export const USERS_ROUT = '/users';
export const SIGNIN_ROUT = '/signin';
export const SIGNUP_ROUT = '/signup';

export const DEFAULT_USER_NAME = 'Жак-Ив Кусто';
export const DEFAULT_USER_ABOUT = 'Исследователь';
export const DEFAULT_USER_AVATAR = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

export const URL_REGEX = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;