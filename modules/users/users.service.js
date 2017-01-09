'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function (app) {
  app.route('/users/:id').get(function(req, res){
    var user = new User(req.params);
    res.status(200).send(req.params);
  });
};
