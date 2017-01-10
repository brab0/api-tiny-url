'use strict';

var mongoose = require('mongoose'),
    Stats = mongoose.model('Stats');

module.exports = function (app) {
  app.route('/stats').get(function(req, res){
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

  app.route('/stats/:id').get(function(req, res){
    var stats = new Stats(req.params);
    res.status(200).send(req.params);
  });
};
