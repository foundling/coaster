function send(data) {
    console.log(this);
    this.writeHead(200, {'Content-type':'text/html'});
    this.write(data);
    this.end();
}

function sendJSON(data) {
    this.writeHead(200, {'Content-type':'application/json'});
    this.write(data);
    this.end();

}

module.exports.handle = function (req, res, callback) {
    res.send = send;
    res.sendJSON = sendJSON;
    callback(req, res);
};
