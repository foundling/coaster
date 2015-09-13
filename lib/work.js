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
            'error_templates' : 'lib/error_templates'
        },
        'encoding' : 'utf-8',
        'mime-types' : {},
        'head': {
              'Content-Type': 'text/html',
        },
        body : {}
    };
    this.port = 2200;
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
        console.log(
            'framework.js is running on port ',
             this.port,    
             ' with these config values:\n', 
             this._config,
        ); 
        if (that.httpMethods[req.method][req.url]) that.httpMethods[req.method][req.url](req, res);  
        else that.renderErrorMessage(res,'400.html');

    }).listen(this.port);

};

Work.prototype.say = function(req, res, val){
    res.writeHead(200, this._config['mime']);
    console.log("wrote "+ this._config['head']);
    res.write('yo i invoked say');
};

Work.prototype.conclude = function(req, res, val){
    res.writeHead(200, this._config['mime']);
    console.log("wrote "+ this._config['head']);
    res.write('yo i invoked say');
    res.end();
};

Work.prototype.render = function(res,template_name, userArg){

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
            var compiled_template = tpl(userArg);
            res.write(compiled_template);
            res.end();
        }
    }); 
};

Work.prototype.renderErrorMessage = function(res, template_name){

    var template_path = [
        this._config['path']['error_templates'], 
        '/',
        template_name,
    ]
    .join('');

    fs.readFile(template_path, this._config['encoding'], function(err, data) {
        // actual error handling should go here;
        if (err) console.log(err);
        else {
            res.write(data);
            res.end();
        }
    }); 
};


Work.prototype.config = function(config_param, value) {
    this._config[config_param] = value;
};


module.exports = Work; 
