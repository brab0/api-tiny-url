'use strict';

var mongoose = require('mongoose'),
    settings = require('../../settings');

var User = mongoose.model('User'),
    Url = mongoose.model('Url');

var usersCtrl = require(settings.controllersPath + 'users.controller');

module.exports = function (app) {

  // add new user
  app.route('/users').post(function(req, res){
    usersCtrl.addNew(req.body, function(code, data){
      res.status(code).send(data);
    });
  });

  // remove user by :userId
  app.route('/users/:userId').delete(function(req, res){
    usersCtrl.removeById(req.params.userId, function(code, data){
      res.status(code).send(data);
    });
  });

  // add url
  app.route('/users/:userId/urls').post(function(req, res){
    usersCtrl.addUrl(req, function(code, data){
      res.status(code).send(data);
    });
  });

  // get status by user
  app.route('/users/:userId/stats').get(function(req, res){
    usersCtrl.getStatsByUserId(req.params.userId, function(code, data){
      res.status(code).send(data);
    });
  });
};
