'use strict';

let mongoose = require('mongoose'),
    config = require('config');

let Url = mongoose.model('Url');

module.exports.getAll = function (_callback) {
  let url = new Url();

  url.getAll(function(err, urls){
    _callback(200, {
      hits: url.countHits(urls),
      urlCount: urls.length,
      topUrls: url.getTopUrls(urls, config.apiDomain)
    });
  });
};

module.exports.getById = function (id, _callback) {
  let url = new Url();

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
        shortUrl : config.apiDomain + url.urlCode
      });
    }
  });
};
