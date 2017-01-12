'use strict';

var bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    settings = require('./settings');

// manipulação de parametros
module.exports.bodyParser = function(app){
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

// Previne CSRF via CORS
module.exports.cors = function(app){
  app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type Origin Accept X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');

    next();
  });
};

/*
  Pela quantidade de arquivos(models e services) da api,
  não achei necessário automatizar os requires com for's,
  wildcards e globs. Preferi deixar simples.
*/

// carrega models(schemes + methods) mongoose
module.exports.models = function(){
  require(path.join(settings.modelsPath, 'urls.model'));
  require(path.join(settings.modelsPath, 'users.model'));
};

// carrega serviços (routes + controllers)
module.exports.services = function(app, servicesPath){
  require(path.join(settings.servicesPath, 'urls.service'))(app);
  require(path.join(settings.servicesPath, 'users.service'))(app);
  require(path.join(settings.servicesPath, 'stats.service'))(app);
};

// abre conexão com MongoDB
module.exports.database = function () {
  mongoose.connect(settings.db.uri + settings.db.name, settings.db.options, function (err) {
    if (err) {
      console.error('Oops! O Mongo não subiu!!!');
      console.log(err);
    } else {
      mongoose.set('debug', settings.db.debug);
    }
  });
};
