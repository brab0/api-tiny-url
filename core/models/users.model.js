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
      ref : 'Url' // populate
    }],
    created: {
      type: Date,
      default: Date.now
    }
});

// add new
UserScheme.methods.addNew = function(_callback) {
  this.save(function(err, data){
    _callback(err, data)
  });
};

// remove user by :userId
UserScheme.methods.removeById = function (id, _callback) {
  this.model('User').remove({
    id : id
  }, function(err, data){
    _callback(err, data);
  });
};

UserScheme.methods.getById = function (id, _callback) {
  this.model('User').findOne({
    id : id
  }, function(err, data){
     _callback(err, data)
  });
};

// add url
UserScheme.methods.pushUrl = function (urlId, _callback) {
  this.urls.push(urlId);
  this.save(function(err, data){
    _callback(err, data)
  });
};

UserScheme.methods.getByUrlId = function (id, _callback) {
  this.model('User').find({
    id : id
  }, function(err, data){
     _callback(err, data)
  });
};

// remove url
UserScheme.methods.pullUrl = function (urlId, _callback) {
  this.model('User').update({},
    { $pull: { urls: urlId } },
    { multi: true })
    .exec(function(err, data){
      _callback(err, data)
    });
};

// get status by user
UserScheme.methods.getStatsByUserId = function (id, _callback) {
  this.model('User').findOne({
    id : id
  })
  .populate('urls', null, null, { sort: { 'hits': -1 , 'created' : -1 } })
  .exec(function(err, data){
    _callback(err, data)
  });
};

mongoose.model('User', UserScheme);
