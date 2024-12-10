const {Router} = require('express');
const {CheckRequiredFields, ExitWithStatus, CheckAuthToken, ExitWithData} = require("../helpers");
const {UsersModel} = require("../models/users.model");
const {RolesModel} = require("../models/roles.model");
const {HTTPStatus, tokenKey} = require("../constants");
const { createHmac } = require('node:crypto');

const router = Router();

router.post('/register', (req, res) => {
  const requiredFields = ['phone', 'password', 'role'];
  if (CheckRequiredFields(req.body, requiredFields)) {
    try {
      UsersModel.create({
        firstName: req.body?.firstName,
        lastName: req.body?.lastName,
        role: req.body?.role,
        password: createHmac('sha256', tokenKey)
          .update(req.body?.password)
          .digest('hex'),
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
    return ExitWithStatus(res, HTTPStatus.Bad_Request);
  }
});

router.post('/login', (req, res) => {

});

router.get('/logout', (req, res) => {

});

router.get('/list', (req, res) => {
  CheckAuthToken(req, res);
  UsersModel.findAll().then(users => {
    ExitWithData(res, users.map(user => ({...user.dataValues, password: undefined})));
  }).catch((err) => {
    ExitWithStatus(res, HTTPStatus.InternalServerError, err);
  });
});

exports.users_router = router;
