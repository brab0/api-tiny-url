var db = require('./db'),
		config = require('./config'),
		bodyParser = require('body-parser');

module.exports = function(app){

  // bodyParser para facilitar a manipulação de parametros
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // CORS Settings
  app.all('/*', function(req, res, next) {
  	res.header('Access-Control-Allow-Origin', '*');
  	res.header('Access-Control-Allow-Headers', 'Content-Type');
  	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  	next();
  });

  /*
  	Pela quantidade de arquivos(models e services) da api,
  	não achei necessário automatizar os requires com for's,
  	wildcards e globs. Preferi deixar simples.
  */

  // carrega esquemas e models mongoose
  require(config.modelsPath + 'urls.model');
  require(config.modelsPath + 'users.model');

  // carrega serviços
  require(config.servicesPath + 'urls.service')(app);
  require(config.servicesPath + 'users.service')(app);
  require(config.servicesPath + 'stats.service')(app);

  db.connect(config.db);
};
