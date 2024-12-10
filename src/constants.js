exports.PORT = 3000;
exports.tokenKey = 'hhj$wxJkl234T71Qassde&@mm.eed@ddf71';
exports.tokenExpiresIn = "1440m";


exports.HTTPStatus = {
  Ok: {
    code: 200,
    message: 'Ok'
  },
  Bad_Request: {
    code: 400,
    message:'bad request'
  },
  Forbidden: {
    code: 403,
    message: 'access forbidden'
  },
  NotFound: {
    code: 404,
    message: 'page is not found'
  },
  Unauthorized: {
    code: 401,
    message: 'unauthorized request'
  },
  InternalServerError: {
    code: 500,
    message: 'internal server error'
  },
  NotImplemented: {
    code: 501,
    message: 'not implemented'
  },
  BadGateway: {
    code: 502,
    message: 'bad gateway'
  }
};

exports.ErrorTypes = {
  BadToken: {
    code: 1000,
    message: 'failed to authenticate token'
  },
  BadRequest: {
    code: 1001,
    message: 'required field(s) not set'
  },
  UserNotFound: {
    code: 1002,
    message: 'user not found'
  },
  TokenExpiredError: {
    code: 1003,
    message: 'token is expired'
  },
  WrongPassword: {
    code: 1004,
    message: 'password is wrong'
  },
  DatabaseQueryError: {
    code: 1005,
    message: 'error, while fetch data from database'
  },
  EmailSendError: {
    code: 1006,
    message: 'error while send email'
  },
  PermissionForbidden: {
    code: 1007,
    message: 'user can not do it, hasn\'t any permission'
  },
  ZeroUpdate: {
    code: 1008,
    message: 'didn\'t update anyone record'
  },
  PermissionMismatch: {
    code: 1009,
    message: 'permission mismatch or unknown, except another'
  },
  UserAlreadyRegistered: {
    code: 1010,
    message: 'user already created and confirmed'
  }
};
