'use strict';

var mongoose = require('mongoose'),
    settings = require('../../settings');

var Url = mongoose.model('Url');

module.exports.getAll = function (_callback) {
  var url = new Url();

  url.getAll(function(err, urls){
    if(!urls){
      _callback(404, {
        msg : "Não existem urls cadastradas."
      });
    }
    else{
      _callback(200, {
        hits: url.countHits(urls),
        urlCount: urls.length,
        topUrls: url.getTopUrls(urls, settings.apiDomain)
      });
    }
  });
};

module.exports.getById = function (id, _callback) {
  var url = new Url();

  url.getById(id, function(err, data){
    if(!data){
      _callback(404, {
        msg : "A url não foi encontrada."
      });
    }
    else{
      _callback(200, {
        id : url._id,
        hits : url.hits,
        url : url.url,
        shortUrl : settings.apiDomain + url.urlCode
      });
    }
  });
};
