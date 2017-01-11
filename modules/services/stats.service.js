'use strict';

var mongoose = require('mongoose'),
    config = require('../../config'),
    Url = mongoose.model('Url');

module.exports = function (app) {

  app.route('/stats').get(function(req, res){
    Url.find({})
    .sort({ 'hits': -1 , 'created' : -1 })
    .exec(function(err, urls){
      if(!urls){
        res.status(404).send({
          msg : "Não existem urls cadastradas."
        });
      }
      else{
        var url = new Url();

        res.status(200).send({
          hits: url.countHits(urls),
          urlCount: urls.length,
          topUrls: url.getTopUrls(urls)
        });
      }
    });
  });

  app.route('/stats/:id').get(function(req, res){
    Url.findOne({
      _id : req.params.id
    })
    .exec(function(err, url){
      if(!url){
        res.status(404).send({
          msg : "A url não foi encontrada."
        });
      }
      else{
        res.status(200).send({
          id : url._id,
          hits : url.hits,
          url : url.url,
          shortUrl : config.apiUrl + url.urlCode
        });
      }
    });
  });
};
