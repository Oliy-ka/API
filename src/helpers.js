const {HTTPStatus, tokenKey, ErrorTypes, tokenExpiresIn} = require("./constants");
const jwt = require('jsonwebtoken');
const {createHmac} = require('node:crypto');

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
  return res.status(status.code < 1000 ? status.code : 500)
    .json({...status, message: message || status.message}).end();
}

exports.ExitWithData = (res, data) => {
  return res.status(HTTPStatus.Ok.code).json({...HTTPStatus.Ok, data}).end();
}

exports.GetToken = (tokenData) => {
  const token = jwt.sign(tokenData, tokenKey, {expiresIn: tokenExpiresIn});
  return `Bearer ${token}`;
};

exports.GetEncryptedPassword = (password) => {
  return createHmac('sha256', tokenKey)
    .update(password)
    .digest('hex');
}

exports.EncodeToken = (token) => {
  return jwt.verify(token, tokenKey);
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
