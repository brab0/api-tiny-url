'use strict';

var mongoose = require('mongoose'),
    Url = mongoose.model('Url'),
    User = mongoose.model('User');

module.exports.getById = function(id, _callback) {
  var url = new Url();

  url.getById(id, function(err, data){
    if(!data.url || err){ // não encontrou url || erro de cast
      _callback(404, {
        msg : "O id da url não foi encontrado."
      });
    }
    else{
      _callback(301, {
        "Location": data.url
      });
    }
  });
};

module.exports.removeById = function(urlId, _callback) {
  var url = new Url(),
      user = new User();

  url.removeById(urlId, function(err, data){
    if(err ||(data.result.n == 0)){ //erro de cast || não encontrou url
      _callback(404, {
        msg : "O id da url não foi encontrado."
      });
    }
    else{
      user.pullUrl(urlId, function(err, data){
        if(err ||(data.n == 0)){ //erro de cast || não encontrou url
          _callback(404, {
            msg : "O id da url não foi encontrado."
          });
        }
        else{
          _callback(204, {});
        }
      });
    }
  });
};
