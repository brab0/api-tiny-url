'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserScheme = new mongoose.Schema({    
    id: {
      type: String,
      trim: true,
      default: '',
      unique: true,
      required: true
    },
    urls : [{
      type : Schema.Types.ObjectId,
      ref : 'Url'
    }],
    created: {
      type: Date,
      default: Date.now
    }
});

mongoose.model('User', UserScheme);
