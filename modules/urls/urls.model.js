'use strict';

var mongoose = require('mongoose');

var UrlScheme = new mongoose.Schema({
    hits: {
      type: String,
      trim: true,
      default: ''
    },
    url: {
      type: String,
      trim: true,
      default: ''
    },
    shortUrl: {
      type: String,
      trim: true,
      default: ''
    },
    created: {
      type: Date,
      default: Date.now
    }
});

mongoose.model('Url', UrlScheme);
