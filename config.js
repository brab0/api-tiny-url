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
  modelsPath : './modules/models/',
  servicesPath : './modules/services/',
  apiUrl : 'http://localhost:3000/'
};
