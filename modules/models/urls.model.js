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
    urlCode: {
      type: String,
      trim: true,
      default: ''
    },
    created: {
      type: Date,
      default: Date.now
    }
});

UrlScheme.methods.getTopUrls = function(urls){
  return urls.map(function(url){
    return {
      id : url._id,
      hits : url.hits,
      url : url.url,
      shortUrl : 'http://localhost:3000/' + url.urlCode
    }
  }).slice(0, 10);
}

UrlScheme.methods.countHits = function(urls){
  return urls.map(function(url){
    return url.hits;
  }).reduce(function(prev, current) {
    return prev + current;
  });
}

mongoose.model('Url', UrlScheme);
