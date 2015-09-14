var chaiHttp = require('chai-http');
var chai = require('chai');
var expect = chai.expect;
var http = require('http');
var fs = require('fs');
chai.use(chaiHttp);

var Work = require('../lib/work');
var app = new Work();

app.define('/test', 'GET', function(req,res){
  res.write('hello phillip');
});
app.listen(5000);


describe('app', function(){
  var response;
  var request;
  before(function(done){
    chai.request('localHost:5000')
    .get('/test')
    .end(function(err, res){
      error = err;
      response = res;
      done();
    });
  });
  it('return a reponse object', function(){
    expect(typeof response).to.eql('object');
  });
});

describe('configuration', function(){
  it('should change config parameters', function(){
    app.config('encoding', 'hex');
    expect(app._config['encoding']).to.eql('hex');
  });
});

describe('define', function(){
  it('should define a route and request handler', function(){
    app.define('/test3', 'GET', function(req,res){
      console.log('hello')
    })
    expect(typeof app.router.routes['GET']['/test3']).to.eql('function')
  })
})

    