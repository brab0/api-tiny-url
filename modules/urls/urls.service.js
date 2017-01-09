'use strict';

var mongoose = require('mongoose'),
    Url = mongoose.model('Url');

module.exports = function (app) {
  app.route('/urls/:id').get(function(req, res){
    var url = new Url(req.params);
    res.status(200).send(req.params);
  });
};
