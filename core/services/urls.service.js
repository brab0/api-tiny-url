'use strict';

let config = require('config'),
    urlCtrl = require("../../" + config.controllersPath + 'urls.controller');

module.exports = function (app) {

  // redirect para url encurtada
  app.route('/urls/:id').get(function(req, res){
    urlCtrl.getById(req.params.id, function(code, data){
      if(code === 404){
        res.status(code).send(data);
      }
      else{
        res.writeHead(code, data);
        res.end();
      }
    });
  });

  // deleta url pelo id
  app.route('/urls/:id').delete(function(req, res){
    urlCtrl.removeById(req.params.id, function(code, data){
      res.status(code).send(data);
    });
  });
};
