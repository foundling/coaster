var http = require('http');


var Work  = function() {
    this.httpMethods = {
        'GET' : {},
        'POST' : {},
    };
    this.port = null;
};

Work.prototype.define = function(route, httpMethod, callback) {
    this.httpMethods[httpMethod][route] = callback;
};

Work.prototype.listen = function(port, callback) {

    this.port = port;
    var that = this;
    this.server = http.createServer(function(req, res) {
        that.httpMethods[req.method][req.url](req,res);
    }).listen(this.port);

};

Work.prototype.config = function(config_param, value) {

    
};


module.exports = Work; 
