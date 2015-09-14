var http = require('http');
var fs = require('fs');
var _ = require('underscore');
var Router = require('./router');
var requestHandlers = require('./request_handlers'); 

var Work  = function(router) {
    //server references router to handle request
    this.router = new Router(requestHandlers);

    this._config = {
        'path' : {
            'templates': 'templates',
            'error_templates' : 'lib/error_templates'
        },
        'encoding' : 'utf-8',
        'mime-types' : ['application/json'],
        'head': {
              'Content-Type': 'text/html',
        },
        body : null,
    };
    this.port = 4000;
};

Work.prototype.define = function(route, httpMethod, callback) {
    if (arguments.length === 2) {
        // if no httpMethod, it's a GET (allowed as a convenience)
        // but have to fix the argument bindings 
        callback = httpMethod;
        this.router.defineRoute(route, 'GET', callback);
    }
    else {
        this.router.defineRoute(route,httpMethod,callback);
    }
};


Work.prototype.listen = function(port, callback) {

    this.port = port;
    var that = this;

    this.server = http.createServer(function(req, res) {
        if (that.router.hasRoute(req.url,req.method)) {
            that.router.execHandler(req, res); 
        }
        else {
            that.renderErrorMessage(res,'400.html');
        }

    }).listen(this.port, function() {
        console.log('Framework.js is running on port',that.port);
        if (callback) callback();
    });

};

// http.serverResponse.protype 
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
