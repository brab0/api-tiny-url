#API Tiny Url
API RESTfull para encurtar urls.

##Ambiente
```html
- MongoDB
- NodeJs
- ExpressJs
- Mongoose
- Mocha, ChaiJs e Supertest
- PM2, se instalado e executado a partir dos scripts .sh (opcional)
```
OBS: Para uma programação mais funcional, foram utilizados recursos e sintaxe pertinentes ao EC6. Por isto, para o funcionamento esperado do projeto, é necessária a instalação da última versão estável do NodeJs.

##Estrutura
Para este exercício, foi utilizado um padrão orientado por controllers, models e services. Onde os serviços basicamente são roteadores que só recebem e respondem às requisições. Os controllers tratam de todo o processamento e formatação das requisições e das respostas. E finalmente, os models, que registram os Schemes do mongoose e declaram os métodos responsáveis pelas consultas do banco de dados. O objetivo é conseguir uma boa modularidade para reaproveitamento de código e fácil manutenção.
```html
|-config
|-core
|--|controllers
|--|models
|--|services
|-test
```

##Instalação e Execução(Linux)
Este exercício contém scripts para instalação(install.sh e install.git.sh) que só deverão ser usados caso o servidor seja Ubuntu e ele esteja limpo(sem nada instalado).

Utilize o comando abaixo, caso deseje que o script clone o projeto do github:
```html
wget https://raw.githubusercontent.com/brab0/api-tiny-url/master/install.git.sh && chmod +x install.git.sh && ./install.git.sh
```
Caso já tenha clonado ou feito o download por conta própria, você deverá executar dentro da pasta do projeto o script install.sh, como mostrado abaixo:
```html
˜# chmod +x install.sh && ./install.sh
```

Durante as atualizações e instalações, serão exibidos prompts para aceitar os pacotes, digite y para todos.
Ao final das instalações, será executado automaticamente o arquivo start.sh, que irá iniciar o banco de dados, os testes e, ao final, a API. Mongo e instância(s) da api utilizam o PM2 como gerenciador de processos.

O arquivo start.sh, que inicia o banco, testes e o projeto com PM2, também pode ser executado à parte. Para isto, dentro da pasta do projeto, execute:
```html
˜# chmod +x start.sh && ./start.sh
```

O projeto também pode ser instalado de forma convencional, caso o servidor já possua pelo menos NodeJs + MongoDB. Para isto, com o banco no ar(sudo mongod), execute:
```html
˜# npm install && npm install-dev
˜# npm start
```

##Testes
Para este projeto foram utilizados o ChaiJs(BDD assertion library) e o Mocha Framework. Para um caso específico(retorno 301), foi utilizado o Supertest, pois o Chai não estava conseguindo manipular a resposta...e não tive tempo pra investigar o por quê =/. Para a execução somente dos testes(com o banco no ar), execute:
```html
˜# npm test
```

##Endpoints
###GET /urls/:id
Retorna 301 com location para a página cadastrada. Se o Id não existe, retorna 404.

###POST /users/:userid/urls
Cadastra uma nova url. Se o userid não existe, retorna 404.
- request body:
```html
{"url" : "http://teste.com"}
```
- response body:
```html
{
  "id" : "123123",
  "hits" : 0,
  "url" : "http://teste.com",
  "shortUrl" : "http://t.com/asda",
}
```

###GET /stats
- Retorna estatísticas globais do sistema.

res.data:
```html
{
  "hits": 193841, // Quantidade de hits em todas as urls do sistema
  "urlCount": 2512, // Quantidade de urls cadastradas
  "topUrls": [ // 10 Urls mais acessadas
              // Objeto stat por id, igual ao /stats/:id, ordernado por hits decrescente
      {
          "id": "23094",
          "hits": 153,
          "url": "http://www.teste.com.br",
          "shortUrl": "http://<host>[:<port>]/asdfeiba"
      },
   ///...
   ]
}
```
###GET /users/:userId/stats
Retorna estatísticas das urls de um usuário. O resultado é o mesmo que GET /stats mas com o escopo dentro de um usuário.
Caso o usuário não exista o retorno deverá ser com código 404 Not Found.

###GET /stats/:id
Retorna estatísticas de uma URL específica.
- res.data:
```html
{
  "id": "23094", // ID da url
  "hits": 0, // Quantidade de hits nela
  "url": "http://www.teste.com.br", // A url original
  "shortUrl": "http://short.url.com/asdfeiba" // A url curta formada
}
```

###DELETE /urls/:id
Apaga uma URL. Retorna vazio em caso de sucesso e 404 caso não ache o id.

###POST /users
Cria um usuário, retorna 201 Created e um objeto JSON no formato a seguir. Caso já exista um usuário com o mesmo id, retorna 409 Conflict.

req.body
```html
{
  "id": "brab0"
}
```

###DELETE /user/:userId
Apaga um usuário. Se não encontrar id, retorna 404.

##Considerações
- Alguns scripts da instalação e execução(PM2 -> Docker), poderiam ter sido melhor escritos com Docker. Infelizmente não foi possível fazê-los por motivos de tempo.
