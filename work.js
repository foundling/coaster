var http = require('http');
var fs = require('fs');
var _ = require('underscore');


var Work  = function() {   //server will reference this map to handle request
    this.httpMethods = {
      'GET' : {},
      'POST' : {},
    };

    this.params = {};
    
    this.port = null;
    };


Work.prototype.define = function(route, httpMethod, callback) {
    this.httpMethods[httpMethod][route] = callback;
};

Work.prototype.listen = function(port, callback) {

    this.port = port;
    var that = this;
    this.server = http.createServer(function(req, res) {
        that.httpMethods[req.method][req.url](req, res);  //executes request hander (httpMethods) upon receiving a req object from client 
        //console.log(that.httpMethods);
    }).listen(this.port);

};

Work.prototype.say = function(req, res, val){
  res.writeHead(this.params['head'], this.params['mime'])
    // res.writeHead(this.params['head'], this.params['mime']  
    //   || 200, {'Content-Type': 'text/plain'});
    console.log("wrote "+ this.params['head']);
    res.write('yo i invoked say');
    res.end();
};

Work.prototype.render = function(res,template_name, user){
    var test =  fs.readFileSync(this.params['templates'] + '/' + template_name);
      //function(err, data){
      // if(err){
      //   console.log(err);
      // } else {
        var tpl = _.template(test.toString());
        var compiled_template = tpl(user);
        res.write(compiled_template);
        res.end();
      }
      

Work.prototype.config = function(config_param, value) {
    this.config_param = config_param;
    this.params[config_param] = value;
    console.log(this.params);
};


module.exports = Work; 
