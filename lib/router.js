var Router = function(requestHandlers) {

    this.requestHandlers = requestHandlers;
    this.routes = {
        'GET' : {},
        'POST' : {}
    };

};

// /upload POST postfunc 
Router.prototype.defineRoute = function(route, httpMethod, callback) {
    this.routes[httpMethod][route] = callback;
};

Router.prototype.hasRoute = function(route, httpMethod) {
    return (this.routes[httpMethod][route]) ? true : false;
};

Router.prototype.execHandler = function(req, res) {
    var callback = this.routes[req.method][req.url]; 
    this.requestHandlers.handle(req, res, callback);    
};

module.exports = Router;
