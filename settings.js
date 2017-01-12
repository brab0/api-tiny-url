'use strict'

module.exports = {
  db :{
    name : 'tiny_url',
    uri: 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/',
    options: {
      user: '',
      pass: ''
    },
    debug: false
  },
  modelsPath : __dirname + '/core/models/',
  servicesPath : __dirname + '/core/services/',
  controllersPath : __dirname + '/core/controllers/',
  apiDomain : 'http://localhost:3000/'
};
