var chaiHttp = require('chai-http');
var chai = require('chai');
var expect = chai.expect;
var http = require('http');
var fs = require('fs');
chai.use(chaiHttp);

var Coaster = require('../lib/coaster');
var app = new Coaster();
var port = process.argv[2] || 5000;

app.define('/mochatest', 'GET', function(req,res){
  res.send('mocha working');
});
app.listen(port);

describe('app', function(){
  var response;
  var request;
  before(function(done){
    chai.request('localHost:5000')
    .get('/mochatest')
    .end(function(err, res){
      error = err;
      response = res;
      console.log(res);
      done();
    });
  });
  it('should return a response object', function(){
    expect(typeof response).to.eql('object');
    expect(response.text).to.eql('mocha working');
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
      console.log('hello');
    });
    expect(typeof app.router.routes['GET']['/test3']).to.eql('function');
  });
});

    
