'use strict';

var mongoose = require('mongoose'),
    Url = mongoose.model('Url');

module.exports = function (app) {
  app.route('/urls/:id').get(function(req, res){
    Url.findByIdAndUpdate({
      _id: req.params.id
    },{
      $inc: {
        hits: 1
      }
    }, function(err, url){
      if(!url || err){ // não encontrou url || erro de cast
        res.status(404).send({
          msg : "O id da url não foi encontrado."
        });
      }
      else{
        res.writeHead(301, { "Location": url.url });
        res.end();
      }
    });
  });

  app.route('/urls/:id').delete(function(req, res){
    Url.remove({
      _id : req.params.id
    }, function(err, data){
      if(err ||(data.result.n == 0)){ //erro de cast || não encontrou url
        res.status(404).send({
          msg : "O id da url não foi encontrado."
        });
      }
      else{
        res.status(204).send({});
      }
    });
  });
};
