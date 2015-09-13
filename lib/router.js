var Router = function(requestHandler) {

  this.routes = {
      'GET'     : {},    // requestHandler.get
      'POST'    : {},    // requestHandler.post
      'PUT'     : {},    // requestHandler.put
      'PATCH'   : {},    // requestHandler.patch
      'DELETE'  : {},    // requestHandler.delete
  };
};

Router.prototype.defineRoute = function(route, httpMethod, callback) {
    // this is a problem, need to check length of arguments and reassign values accordingly
    if (httpMethod === null) {
        this.routes['GET'][route] = callback;
    } else {
        this.routes[httpMethod][route] = callback;
    }
};

module.exports = Router;
