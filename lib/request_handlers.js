var url = require('url');

function send(data) {
    this.writeHead(200, {'Content-type':'text/html'});
    this.write(data);
    this.end();
}

function sendJSON(data) {
    this.writeHead(200, {'Content-type':'application/json'});
    this.write(data);
    this.end();
}


// binding these custom delivery methods to the res object
module.exports.handle = function (req, res, callback) {

    // bind our custom events
    res.send = send;
    res.sendJSON = sendJSON;
    req.query_string = url.parse(req.url, true).query;

    // call the callback with these
    callback(req, res);
};
