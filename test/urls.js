process.env.NODE_ENV = 'test';

let mongoose = require("mongoose"),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server'),
    should = chai.should();

let request = require('supertest')(server);


let User = mongoose.model('User'),
    Url = mongoose.model('Url');

chai.use(chaiHttp);

describe('Urls', () => {
  beforeEach((done) => { //Limpa collection antes do teste
    Url.remove({}, (err) => {
      User.remove({}, (err) => {
         done();
      });
    });
  });

  describe('Redirecionar para Url encurtada', () => {
    describe('GET /urls/:id', () => {
      it('should return 404 code and a String msg if url was not found', (done) => {
        chai.request(server)
        .get('/urls/321321231')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('msg').equal("O id da url não foi encontrado.");
          res.body.msg.should.be.a('string');

          done();
        });
      });

      it('should return 301 code and location url', (done) => {
        let url = { url : 'http://chaordic.com.br/folks' }; // atributo deveria ser url e não uri
        let user = new User({ id : 'jibao' });

        user.save((err, res) => {
          chai.request(server)
          .post('/users/' + res.id + '/urls')
          .send(url)
          .end((err, res) => {
            request // supertest para manipular 301. O chai.request não estava conseguindo
            .get('/urls/' + res.body.id)
            .expect(301, done);
          });
        });
      });
    });
  });

  describe('Remover Url', () => {
    describe('DELETE /urls/:id', () => {
      it('should return 404 code and a String msg if url was not found', (done) => {
        chai.request(server)
        .delete('/urls/321321231')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('msg').equal("O id da url não foi encontrado.");
          res.body.msg.should.be.a('string');

          done();
        });
      });

      it('should delete and return 204 code with an empty Object', (done) => {
        let url = { url : 'http://chaordic.com.br/folks' }; // atributo deveria ser url e não uri
        let user = new User({ id : 'jibao' });

        user.save((err, res) => {
          chai.request(server)
          .post('/users/' + res.id + '/urls')
          .send(url)
          .end((err, res) => {
            chai.request(server)
            .delete('/urls/' + res.body.id)
            .end((err, res) => {
              res.should.have.status(204);

              done();
            });
          });
        });
      });
    });
  });
});
