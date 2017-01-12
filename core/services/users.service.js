'use strict';

let mongoose = require('mongoose'),
    config = require('config');

let User = mongoose.model('User'),
    Url = mongoose.model('Url');

let usersCtrl = require("../../" + config.controllersPath + 'users.controller');

module.exports = function (app) {

  // get status by user
  app.route('/users/:userId/stats').get(function(req, res){
    usersCtrl.getStatsByUserId(req.params.userId, function(code, data){
      res.status(code).send(data);
    });
  });

  // add new user
  app.route('/users').post(function(req, res){
    usersCtrl.addNew(req.body, function(code, data){
      res.status(code).send(data);
    });
  });

  // add url
  app.route('/users/:userId/urls').post(function(req, res){
    usersCtrl.addUrl(req, function(code, data){
      res.status(code).send(data);
    });
  });

  // remove user by :userId
  app.route('/users/:userId').delete(function(req, res){
    usersCtrl.removeById(req.params.userId, function(code, data){
      res.status(code).send(data);
    });
  });
};
