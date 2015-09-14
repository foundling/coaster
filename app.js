// demo file

var Work = require('./lib/work');
var app = new Work();
var port = process.argv[2] || 5000;

// Defaults to GET request
app.define('/test', function(req, res) {
    res.send('This is a test of /test');
});

app.define('/', 'GET', function(req, res) {
    res.send('/ test with res.send');

});

app.define('/user', 'GET', function(req, res) {
    var person = {
        'name' : 'bob',
        'id' : '3045'
    };
    res.sendJSON(person);
});

app.define('/alex', 'GET', function(req, res) {
    res.sendJSON('{"name":"alex"}');
});

app.define('/post_test', 'POST', function(req, res) {

    res.send('received your post request, but didnt look at the data yet');
});

app.define('/post_test', 'POST', function(req, res) {
    var out = '';
    req.on('data', function(chunk) {
        out += chunk; 
    });
    req.on('end', function() {
        res.send(out);
    });
    console.log(req.body);
}); 

app.listen(port, function() {
    console.log('CONFIG VALUES:');
    console.log(JSON.stringify(app._config, undefined, 2));
});
