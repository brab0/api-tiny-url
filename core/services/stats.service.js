'use strict';

var mongoose = require('mongoose'),
    settings = require('../../settings');

var Url = mongoose.model('Url');

var statsCtrl = require(settings.controllersPath + 'stats.controller')

module.exports = function (app) {

  // retorna status geral do sistema
  app.route('/stats').get(function(req, res){
    statsCtrl.getAll(function(code, data){
      res.status(code).send(data);
    });
  });

  // retorna status de um usuário específico
  app.route('/stats/:id').get(function(req, res){
    statsCtrl.getById(req.params.id, function(code, data){
      res.status(code).send(data);
    });
  });
};
