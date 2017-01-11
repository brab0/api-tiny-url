var app = require('express')();

require('./load')(app);

app.listen(3000, function(){
	console.log('Api rodando na porta 3000!');
});
