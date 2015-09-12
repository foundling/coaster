var routes = {
    'GET' : {},
    'POST' : {},
    'PUT' : {},
    'PATCH' : {},
    'DELETE' : {},
};

var Router = {
    
};

Router.prototype.get = function(route, callback) {
    routes.GET[route] = callback;
};

module.exports = function () {
    return new Router();
};
