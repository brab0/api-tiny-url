'use strict';

let bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    config = require('config');

// manipulação de parametros
module.exports.bodyParser = function(app){
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/json'}));
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

// registra e carrega models(schemes + methods) mongoose
module.exports.models = function(){
  require(path.join(__dirname + config.modelsPath, 'urls.model'));
  require(path.join(__dirname + config.modelsPath, 'users.model'));
};

// carrega serviços (routes + controllers)
module.exports.services = function(app, servicesPath){
  require(path.join(__dirname + config.servicesPath, 'urls.service'))(app);
  require(path.join(__dirname + config.servicesPath, 'users.service'))(app);
  require(path.join(__dirname + config.servicesPath, 'stats.service'))(app);
};

// abre conexão com MongoDB
module.exports.database = function () {
  mongoose.connect(config.db.uri + config.db.name, config.db.options, function (err) {
    if (err) {
      console.error('Oops! O Mongo não subiu!!!');
      console.log(err);
    } else {
      mongoose.set('debug', config.db.debug);
    }
  });
};
