'use strict';

var mongoose = require('mongoose');

var UrlScheme = new mongoose.Schema({
    hits: {
      type: Number,
      default: 0
    },
    url: {
      type: String,
      trim: true,
      default: ''
    },
    urlCode: { // em vez de shortUrl para prever escalabilidade (caso domínio seja trocado ou seja selecionável)
      type: String,
      trim: true,
      default: ''
    },
    created: {
      type: Date,
      default: Date.now
    }
});

// separa as 10 primeiras urls do array sem limit
UrlScheme.methods.getTopUrls = function(urls, apiDomain){
  return urls.map(function(url){
    return {
      id : url._id,
      hits : url.hits,
      url : url.url,
      shortUrl : apiDomain + url.urlCode
    }
  }).slice(0, 10);

}

// aproveita retorno do .find() e substitui a necessidade
// de fazer uma segunda requisição de Count no Mongo
UrlScheme.methods.countHits = function(urls){
  if(urls.length > 0){
    return urls.map(function(url){
      return url.hits;
    }).reduce(function(prev, current) {
      return prev + current;
    });
  }
  else{
    return 0;
  }
}

UrlScheme.methods.getAll = function (_callback) {
  this.model('Url').find({})
  .sort({ 'hits': -1 , 'created' : -1 })
  .exec(function(err, data){
    _callback(err, data)
  });
};

UrlScheme.methods.getById = function(id, _callback) {
  this.model('Url').findByIdAndUpdate({
    _id: id
  },{
    $inc: {
      hits: 1
    }
  }, function(err, data){
    _callback(err, data);
  });
};

UrlScheme.methods.addNew = function(_callback) {
  this.save(function(err, data){
    _callback(err, data)
  });
};

UrlScheme.methods.removeById = function(id, _callback) {
  this.model('Url').remove({
    _id : id
  }, function(err, data){
    _callback(err, data)
  });
};

mongoose.model('Url', UrlScheme);
