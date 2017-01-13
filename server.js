let app = require('express')(),
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
app.listen(3000, function(){
	console.log('Servidor rodando na porta 3000!');
});

// exporta server para testes
module.exports = app;
