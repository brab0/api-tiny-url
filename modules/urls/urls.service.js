'use strict';

var mongoose = require('mongoose'),
    Url = mongoose.model('Url');

module.exports = function (app) {
  app.route('/urls/:id').get(function(req, res){
    res.status(301).send(req.params);
  });

  app.route('/urls/:id').delete(function(req, res){
    res.status(200).send('deleted!');
  });
};
