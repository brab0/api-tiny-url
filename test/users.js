process.env.NODE_ENV = 'test';

let mongoose = require("mongoose"),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server'),
    should = chai.should();

let User = mongoose.model('User'),
    Url = mongoose.model('Url');

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => { //Limpa collection antes do teste
    Url.remove({}, (err) => {
      User.remove({}, (err) => {
         done();
      });
    });
  });

  describe('Retornar status por usuário', () => {
    describe('GET /users/:userId/stats', () => {
      it('should return 404 code and a String msg if user was not found', (done) => {
        chai.request(server)
        .get('/users/brab0/stats')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('msg').equal("O id do usuário não foi encontrado.");
          res.body.msg.should.be.a('string');

          done();
        });
      });

      it('should succeed and return 200 code with an User Stats Object if find by :userId', (done) => {
        let user = new User({ id: "jibao" });
        user.save((err, user) => {
          chai.request(server)
          .get('/users/' + user.id + '/stats')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('hits').equal(0);
            res.body.should.have.property('urlCount').equal(0);
            res.body.should.have.property('topUrls');
            res.body.topUrls.should.be.an('array').lengthOf(0);

            done();
          });
        });
      });
    });
  });

  describe('Inserir novo usuário', () => {
    describe('POST /users', () => {
      it('should add a new user and return 201(created) code with an User Object if post succeed', (done) => {
        let user = { id : 'jibao'};

        chai.request(server)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('id').equal(user.id);
          res.body.id.should.be.a('string');

          done();
        });
      });

      it('should fail when trying to add an existent user and return a 409 code with a msg of it', (done) => {
        let user = { id : 'jibao'}; // od em vez de id

        chai.request(server)
        .post('/users')
        .send(user)
        .end((err, res) => {
          chai.request(server)
          .post('/users')
          .send(user)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.have.property('msg').equal("Já existe um usuário com o id enviado.");
            res.body.msg.should.be.a('string');

            done();
          });
        });
      });

      it('should fail and return 400 with an err Object if the request is malformed', (done) => {
        let user = { od : 1}; // esperado id em vez de od e string em vez de number

        chai.request(server)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);

          done();
        });
      });
    });
  });

  describe('Adicionar Url', () => {
    describe('POST /users/:userId/urls', () => {
      it('should return 404 code and a String msg if user was not found', (done) => {
        let url = { url : 'http://chaordic.com.br/folks'};

        chai.request(server)
        .post('/users/brab0/urls')
        .send(url)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('msg').equal("O id do usuário não foi encontrado.");
          res.body.msg.should.be.a('string');

          done();
        });
      });

      it('should return 400 and an err Object if request is malformed', (done) => {
        let url = { uri : 'http://bad-request.com' }; // atributo deveria ser url e não uri
        let user = new User({ id : 'jibao' });

        user.save((err, user) => {
          chai.request(server)
          .post('/users/' + user.id + '/urls')
          .send(url)
          .end((err, res) => {
            res.should.have.status(400);

            done();
          });
        });
      });

      it('should return 400 and an err Object if url is blank', (done) => {
        let url = { uri : '' }; // atributo deveria ser url e não uri
        let user = new User({ id : 'jibao' });

        user.save((err, user) => {
          chai.request(server)
          .post('/users/' + user.id + '/urls')
          .send(url)
          .end((err, res) => {
            res.should.have.status(400);

            done();
          });
        });
      });

      it('should add a new url, make it shorter and return 201(created) with an Url Object', (done) => {
        let url = { url : 'http://chaordic.com.br/folks'};
        let user = new User({ id : 'jibao' });

        user.save((err, user) => {
          chai.request(server)
          .post('/users/' + user.id + '/urls')
          .send(url)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.an('object');
            res.body.should.have.property('hits').equal(0);
            res.body.should.have.property('url').equal(url.url);
            res.body.should.have.property('shortUrl');
            res.body.shortUrl.should.be.a('string');

            done();
          });
        });
      });
    });
  });

  describe('Remover Usuário', () => {
    describe('DELETE /users/:userId', () => {
      it('should return 404 code and a String msg if user was not found', (done) => {
        chai.request(server)
        .delete('/users/brab0')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('msg').equal("O id do usuário não foi encontrado.");
          res.body.msg.should.be.a('string');

          done();
        });
      });

      it('should delete and return 204 code with an empty Object', (done) => {
        let user = new User({ id: "jibao" });
        user.save((err, user) => {
          chai.request(server)
          .delete('/users/' + user.id)
          .end((err, res) => {
            res.should.have.status(204);
            res.body.should.be.a('object');

            done();
          });
        });
      });
    });
  });
});
