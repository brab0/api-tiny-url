'use strict';

var mongoose = require('mongoose'),
    config = require('../../config'),
    User = mongoose.model('User'),
    Url = mongoose.model('Url');

module.exports = function (app) {

  // add new
  app.route('/users').post(function(req, res){
    var user = new User(req.body);

    user.save(function(err, data){
      if(err && err.code == 11000){ // duplicate key
        res.status(409).send({
          msg : "Já existe um usuário com o id enviado."
        });
      }
      else{
        res.status(201).send({
          id : data.id
        });
      }
    });
  });

  // remove user by id
  app.route('/users/:userId').delete(function(req, res){
    User.remove({
      id : req.params.userId
    }, function(err, data){

      if(data.result.n == 0){ //no effect
        res.status(404).send({
          msg : 'Usuário não encontrado.'
        });
      }
      else{
        res.status(204).send({});
      }
    });
  });

  // add url
  app.route('/users/:userId/urls').post(function(req, res){

    User.findOne({
      id : req.params.userId
    }, function(err, user){
      if(!user){
        res.status(404).send({
          msg : "O id do usuário não foi encontrado."
        });
      }
      else{

        // gera o código da url a partir da soma do id do Usuário, convertido para Int,
        // com o timestamp da inserção. Desta forma, eliminando problemas com inserções
        // de código repetido(se usasse somente timestamp) em multiplas instâncias.

        var now = new Date();
        var urlCode = (parseInt(user._id) + parseInt(now.getTime())).toString(36);

        var url = new Url({
          userId : req.params.userId,
          url : req.body.url,
          urlCode : urlCode
        })

        url.save(function(err, u){
          if(err){
            res.status(400).send(err);
          }
          else if(u){
            user.urls.push(u._id);
            user.save(function(){
              res.status(201).send({
                id : u._id,
                hits : u.hits,
                url : u.url,
                shortUrl : config.apiUrl + u.urlCode
              });
            });
          }
        });
      }
    });
  });

  // get status by user
  app.route('/users/:userId/stats').get(function(req, res){

    User.findOne({
      id : req.params.userId
    })
    .populate('urls', null, null, { sort: { 'hits': -1 , 'created' : -1 } })
    .exec(function(err, user){
      if(!user){
        res.status(404).send({
          msg : "O id do usuário não foi encontrado."
        });
      }
      else{
        var url = new Url();

        res.status(200).send({
          hits: url.countHits(user.urls),
          urlCount: user.urls.length,
          topUrls: url.getTopUrls(user.urls)
        });
      }
    });
  });
};
