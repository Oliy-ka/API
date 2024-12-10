const {HTTPStatus, tokenKey, ErrorTypes} = require("./constants");
const jwt = require('jsonwebtoken');

exports.CheckRequiredFields = (req, requiredFields = []) => {
  const fields = Object.keys(req);
  let count = 0;
  fields.forEach((field) => {
    if (requiredFields.includes(field)) {
      count++;
    }
  });
  return count === requiredFields.length;
}

exports.ExitWithStatus = (res, status, message = '') => {
  return res.status(status.code).json({...status, message: message || status.message}).end();
}

exports.ExitWithData = (res, data) => {
  return res.status(HTTPStatus.Ok.code).json({...HTTPStatus.Ok, data}).end();
}

exports.CheckAuthToken = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(HTTPStatus.Unauthorized.code).json(HTTPStatus.Unauthorized).end();
  }
  jwt.verify(token, tokenKey, (err, decoded) => {
    if (err) {
      return res.status(HTTPStatus.Forbidden.code).json(err.name === 'TokenExpiredError'
        ? ErrorTypes.TokenExpiredError : ErrorTypes.BadToken).end();
    }
    return true;
  })
}
