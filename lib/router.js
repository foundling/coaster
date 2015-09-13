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
    this.routes[httpMethod][route] = callback;
};

module.exports = Router;
