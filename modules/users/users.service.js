'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function (app) {
  app.route('/users').post(function(req, res){
    res.status(201).send({
      id : 'jibao'
    });
  });

  app.route('/users').delete(function(req, res){
    res.status(200).send({});
  });

  app.route('/users/:userId/urls').post(function(req, res){
    res.status(200).send({
      id : '23094',
      hits : 0,
      url : 'http://chaordic.com/123123',
      shortUrl : 'http://cd.ic/12',
    });
  });

  app.route('/users/:userId/stats').get(function(req, res){
    res.status(200).send({
      hits: 193841, // Quantidade de hits em todas as urls do sistema
      urlCount: 2512, // Quantidade de urls cadastradas
      topUrls: [ // 10 Urls mais acessadas
        // Objeto stat por id, igual ao /stats/:id, ordernado por hits decrescente
        {
          "id": "23094",
          "hits": 153,
          "url": "http://www.chaordic.com.br/folks",
          "shortUrl": "http://<host>[:<port>]/asdfeiba"
        },{
          "id": "23090",
          "hits": 89,
          "url": "http://www.chaordic.com.br/chaordic",
          "shortUrl": "http://<host>[:<port>]/asdfeiba"
        }
      ]
    });
  });
};
