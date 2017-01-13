let app = require('express')(),
		config = require('config'),
		load = require('./load');

// carrega body-parser middleware
load.bodyParser(app);

// carrega CORS middleware
load.cors(app);

// carrega models(schemes + methods) mongoose
load.models();

// carrega serviços (routes + controllers)
load.services(app);

// carrega e abre conexão com o MongoDB
load.database();

// levanta servidor
app.listen(config.apiPort, function(){
	console.log('API ' + config.env + ' rodando na porta ' + config.apiPort);
});

// exporta server para testes
module.exports = app;
