'use strict';

var mongoose = require('mongoose');

var UserScheme = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      default: ''
    },
    created: {
      type: Date,
      default: Date.now
    }
});

mongoose.model('User', UserScheme);
