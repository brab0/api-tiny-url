'use strict';

let mongoose = require('mongoose'),
    config = require('config');

let Url = mongoose.model('Url'),
    User = mongoose.model('User');

module.exports.addNew = function (obj, _callback) {

  // instancia model
  let user = new User(obj);

  user.addNew(function(err, data){
    if(err){ // duplicate key
      if(err.code == 11000){ // duplicate key
        _callback(409, {
          msg : "Já existe um usuário com o id enviado."
        });
      }
      else{
        _callback(400, err);
      }
    }
    else{
      _callback(201, {
        id : data.id
      });
    }
  });
};

// remove user by :userId
module.exports.removeById = function (id, _callback) {
  let user = new User();

  user.removeById(id, function(err, data){
    if(err){
      _callback(400, err);
    }
    else if(data.result.n == 0){ // remoção sem efeito
      _callback(404, {
        msg : 'O id do usuário não foi encontrado.'
      });
    }
    else{
      _callback(204, {});
    }
  });
};

// add url
module.exports.addUrl = function (req, _callback) {

  let user = new User();

  user.getById(req.params.userId, function(err, data){
    if(err){
      _callback(400, err);
    }
    else if(!data){
      _callback(404, {
        msg : "O id do usuário não foi encontrado."
      });
    }
    else{

      /* gera o código da url a partir da soma do id do Usuário, convertido para Int,
         com o timestamp da inserção. Desta forma, eliminando problemas com inserções
         de código repetido(se usasse somente timestamp) em multiplas instâncias.
      */

      let now = new Date();

      let urlCode = (parseInt(data._id) + parseInt(now.getTime())).toString(36);

      let url = new Url({
        url : req.body.url,
        urlCode : urlCode
      });

      url.addNew(function(err, u){
        if(err){
          _callback(400, err);
        }
        else{
          data.pushUrl(u._id, function(err, data){
            if(err){
              _callback(400, err);
            }
            else{
              _callback(201, {
                id : u._id,
                hits : u.hits,
                url : u.url,
                shortUrl : config.apiDomain + u.urlCode
              });
            }
          });
        }
      });
    }
  });
};

// get status by user
module.exports.getStatsByUserId = function (id, _callback) {
  let user = new User();

  user.getStatsByUserId(id, function(err, data){
    if(err){
      _callback(400, err);
    }
    else if(!data){
      _callback(404, {
        msg : "O id do usuário não foi encontrado."
      });
    }
    else {
      let url = new Url();

      _callback(200, {
        hits: url.countHits(data.urls),
        urlCount: data.urls.length,
        topUrls: url.getTopUrls(data.urls, config.apiDomain)
      });
    }
  });
};
