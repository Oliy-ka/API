const {Router} = require('express');
const {CheckRequiredFields, ExitWithStatus, CheckAuthToken, ExitWithData, GetToken, GetEncryptedPassword} = require("../helpers");
const {UsersModel} = require("../models/users.model");
const {RolesModel} = require("../models/roles.model");
const {HTTPStatus, tokenKey, ErrorTypes} = require("../constants");

const router = Router();

router.post('/register', (req, res) => {
  const requiredFields = ['phone', 'password', 'role'];
  if (CheckRequiredFields(req.body, requiredFields)) {
    try {
      UsersModel.create({
        firstName: req.body?.firstName,
        lastName: req.body?.lastName,
        role: req.body?.role,
        password: GetEncryptedPassword(req.body.password),
        phone: req.body?.phone,
      }).then(() => {
        console.log("Successfully registered");
        return ExitWithStatus(res, HTTPStatus.Ok);
      }).catch((err) => {
        console.error(err);
        ExitWithStatus(res, HTTPStatus.InternalServerError, err);
      });
    } catch (error) {
      console.error(error);
      ExitWithStatus(res, HTTPStatus.InternalServerError, error);
    }

  } else {
    ExitWithStatus(res, HTTPStatus.Bad_Request);
  }
});

router.post('/login', (req, res) => {
  const requiredFields = ['phone', 'password'];
  if (!CheckRequiredFields(req.body, requiredFields)) {
    ExitWithStatus(res, HTTPStatus.Bad_Request);
  } else {
    UsersModel.findOne({
      where: {phone: req.body?.phone},
    }).then((user) => {
      const sent_password_encrypted = GetEncryptedPassword(req.body?.password);
      if (user) {
        console.log("found user data");
        if (sent_password_encrypted === user.dataValues.password) {
          ExitWithData(res, {token: GetToken({phone, firstName, lastName, role, ...newData} = user.dataValues)});
        } else {
          ExitWithStatus(res, ErrorTypes.WrongPassword);
        }
      } else {
        ExitWithStatus(res, ErrorTypes.UserNotFound);
      }
    }).catch((err) => {
      ExitWithStatus(res, HTTPStatus.InternalServerError, err);
    });
  }
});


router.get('/list', (req, res) => {
  CheckAuthToken(req, res).then(() => {
    UsersModel.findAll().then(users => {
      ExitWithData(res, users.map(user => ({...user.dataValues, password: undefined})));
    }).catch((err) => {
      ExitWithStatus(res, HTTPStatus.InternalServerError, err);
    });
  }).catch((err) => {
    ExitWithStatus(res, err);
  });
});

exports.users_router = router;
