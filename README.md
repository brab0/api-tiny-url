#API Tiny Url

##Overview
API RESTfull para encurtar urls desenvolvida com NodeJs, ExpressJs, Mongoose e MongoDB. 

##Estrutura
Para este exercício, foi utilizado um padrão orientado por controllers, models e services. Onde os serviços basicamente são roteadores que só recebem e respondem às requisições. Os controllers tratam de todo o processamento e formatação das requisições e das respostas enviadas. E finalmente, os modelos abarcam os Schemes do mongoose e métodos pertinentes a eles. Desta forma, conseguiu-se uma boa modularidade para reaproveitamento de código e fácil manutenção.
```html
|-config
|-core
|--|controllers
|--|models
|--|services
|-test
```

##Instalação e Execução(Linux)
Este exercício contém um shell script de instalação(install.sh) que só deverá ser usado caso o servidor seja Ubuntu e ele esteja limpo. 

Abra o terminal e cole: wget https://raw.githubusercontent.com/brab0/api-tiny-url/master/install.sh && chmod +x install.sh && ./install.sh

O comando acima irá baixar o arquivo install.sh via wget, dar permissão de execução e executá-lo. Durante as atualizações e instalações, serão exibidos prompts para aceitar os pacotes, digite y para todos. Ao final das instalaçes, os script irá executar automaticamente o arquivo start.sh, que iniciar o banco de dados, os testes e ao, final a aplicação. O mongo e a instancia(s) da api utilizam aqui o PM2 como gerenciador de processos.

O mesmo resultado pode ser obtido fazendo o download do zip do projeto(ou clonando) e executando. Após extrair e entrar no projeto:
```html
˜# chmod +x install.sh && ./install.sh
```

Caso todas as instalações para este projeto já tenham sido feitas, ele pode ser executado dentro do projeto com:
```html
˜# chmod +x start.sh && ./start.sh
```

É importante ressaltar que os scripts .sh foram criados para instalar e executar o projeto em um ambiente sem nada. Porém, é possível instalar e executar o projeto de forma convencional, caso o servidor já possua pelo menos node + mongo. Desta forma:
```html
˜# sudo mongod
˜# npm install
˜# npm install-dev
˜# npm start
```

##Testes
Para este projeto, foram utilizados o ChaiJs(BDD assertion library) e o Mocha Framework. Para um caso específico(retorno 301), foi utilizado o Supertest, pois o Chai não estava conseguindo manipular a resposta...e não tive tempo pra investigar o por quê. Para a execução somente dos testes(com o banco no ar):
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

response body:
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
- response body:
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

```html
{
  "id": "brab0"
}
```

###DELETE /user/:userId
Apaga um usuário. Se não encontrar id, retorna 404.

##Considerações
- Alguns scripts da instalação e execução(PM2 -> Docker), poderiam ter sido melhor escritos com Docker. Infelizmente não foi possível fazêlos por motivos de tempo.
