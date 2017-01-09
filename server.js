var app = require('express')(),
		db = require('./db'),
		bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// carrega esquema mongoose
require('./modules/urls/urls.model');
require('./modules/users/users.model');

// carrega serviços
require('./modules/urls/urls.service')(app);
require('./modules/users/users.service')(app);

db.connect();

app.listen(3000, function(){
	console.log('Api rodando na porta 3000!');
});
