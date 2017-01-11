'use strict';

var mongoose = require('mongoose');

module.exports.connect = function (db) {
  var db = mongoose.connect(db.uri + db.name, db.options, function (err) {
    if (err) {
      console.error('Oops! O Mongo não subiu!!!');
      console.log(err);
    } else {
      mongoose.set('debug', db.debug);
    }
  });
};
