const {Router} = require('express');
const {CheckRequiredFields, ExitWithStatus, CheckAuthToken} = require("../helpers");
const {UsersModel} = require("../models/users.model");
const {RolesModel} = require("../models/roles.model");
const {HTTPStatus, tokenKey} = require("../constants");
const { createHmac } = require('node:crypto');

const router = Router();

router.post('/register', (req, res) => {
  const requiredFields = ['phone', 'password', 'roles'];
  if (CheckRequiredFields(req.body, requiredFields)) {
    try {
      UsersModel.create({
        firstName: req.body?.firstName,
        lastName: req.body?.lastName,
        roles: req.body.roles.join(','),
        password: createHmac('sha256', tokenKey)
          .update(req.body.password)
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

router.get('/users', (req, res) => {

});

exports.users_router = router;
