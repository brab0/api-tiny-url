process.env.NODE_ENV = 'test';

let mongoose = require("mongoose"),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server'),
    should = chai.should();

let User = mongoose.model('User'),
    Url = mongoose.model('Url');

chai.use(chaiHttp);

describe('Stats', () => {
  beforeEach((done) => { //Limpa collection antes do teste
    Url.remove({}, (err) => {
      User.remove({}, (err) => {
         done();
      });
    });
  });

  describe('Retornar status geral do sistema', () => {
    describe('GET /stats', () => {
      it('should return 200 code and a Stats Object', (done) => {
        chai.request(server)
        .get('/stats')
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

  describe('Retornar status de uma url específica', () => {
    describe('GET /stats/:id', () => {
      it('should return 404 code and a String msg if url was not found', (done) => {
        chai.request(server)
        .get('/stats/93287912')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('msg').equal("A url não foi encontrada.");
          res.body.msg.should.be.a('string');

          done();
        });
      });

      it('should return 200 code with an Url Stats Object if find it by :id', (done) => {

        let url = { url : 'http://chaordic.com.br/folks'};
        let user = new User({ id : 'jibao' });

        user.save((err, user) => {
          chai.request(server)
          .post('/users/' + user.id + '/urls')
          .send(url)
          .end((err, res) => {
            chai.request(server)
            .get('/stats/' + res.body.id)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('id').equal(res.body.id);
              res.body.should.have.property('hits').equal(0);
              res.body.should.have.property('url');
              res.body.should.have.property('shortUrl');

              done();
            });
          });
        });
      });
    });
  });
});
