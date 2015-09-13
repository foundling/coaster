var http = require('http');
var fs = require('fs');
var _ = require('underscore');


var Work  = function() {   
    //server references httpMethods to handle request
    this.httpMethods = {
      'GET'     : {},
      'POST'    : {},
      'PUT'     : {},
      'PATCH'   : {},
      'DELETE'  : {},
    };
    this._config = {
        'path' : {
            'templates': 'templates',
        },
        'encoding' : 'utf-8',
        'mime' : {
            'Content-type':'text/html'
        },
        'head':'',
    };
    this.port = null;

};

Work.prototype.define = function(route, httpMethod, callback) {
    if (!httpMethod) {
        this.httpMethods['GET'][route] = callback;
    } else {
        this.httpMethods[httpMethod][route] = callback;
    }
};

Work.prototype.listen = function(port, callback) {

    this.port = port;
    var that = this;
    this.server = http.createServer(function(req, res) {
        that.httpMethods[req.method][req.url](req, res);  
        //executes request hander (httpMethods) upon receiving a req object from client 
        //console.log(that.httpMethods);
    }).listen(this.port);

};

Work.prototype.say = function(req, res, val){
    res.writeHead(200, this._config['mime']);
    console.log("wrote "+ this._config['head']);
    res.write('yo i invoked say');
    res.end();
};

Work.prototype.render = function(res,template_name, user){

    var template_path = [
        this._config['path']['templates'], 
        '/',
        template_name,
    ]
    .join('');

    fs.readFile(template_path, this._config['encoding'], function(err, data) {
        // actual error handling should go here;
        if (err) console.log(err);
        else {
            var tpl = _.template(data); 
            var compiled_template = tpl(user);
            res.write(compiled_template);
            res.end();
        }
    }); 
};

Work.prototype.config = function(config_param, value) {
    this._config[config_param] = value;
    console.log(this._config);
};


module.exports = Work; 
