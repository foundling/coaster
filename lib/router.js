var Router = function(requestHandler) {
  
  this.routes = {
      'GET'     : null,    // requestHandler.get
      'POST'    : null,    // requestHandler.post
      'PUT'     : null,    // requestHandler.put
      'PATCH'   : null,    // requestHandler.patch
      'DELETE'  : null,    // requestHandler.delete
  };
};

Router.prototype.defineRoute = function(route, httpMethod, callback) {
    if (!httpMethod) {
        this.routes['GET'][route] = callback;
    } else {
        this.routes[httpMethod][route] = callback;
    }
};
