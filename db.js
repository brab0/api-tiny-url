'use strict';

var mongoose = require('mongoose');

module.exports.connect = function () {
  var DB_CONF = {
  	name : 'nhamy',
    uri: 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/',
    options: {
      user: '',
      pass: ''
    },
    debug: false // ou true
  };

  var db = mongoose.connect(DB_CONF.uri + DB_CONF.name, DB_CONF.options, function (err) {
    if (err) {
      console.error('Oops! O Mongo não subiu!!!');
      console.log(err);
    } else {
      mongoose.set('debug', DB_CONF.debug);
    }
  });
};
