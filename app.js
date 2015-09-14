// demo file

var Coaster = require('./lib/coaster');
var app = new Coaster();
var port = process.argv[2] || 5000;

// Defaults to GET request
app.define('/test', function(req, res) {
    res.send('This is a test of /test');
});

// Explicit GET request
app.define('/', 'GET', function(req, res) {
    res.send('/ test with res.send');
});


// GET Request with Rendered Template
app.define('/data', 'GET', function(req, res) {
    app.render(res, 'index.html', {'name':'Alex'});
});

// GET Request with a JSON response
app.define('/alex', 'GET', function(req, res) {
    res.sendJSON('{"name":"alex"}');
});

// handling a post request 
app.define('/msg_len', 'POST', function(req, res) {

    res.send('received your post request, but didnt look at the data yet');
    console.log(typeof req.body);
});

app.define('/signin', 'POST', function(req, res) {

    var data = 0,
        that;

    req.on('data', function(data) {
        data += data; 
    });

    req.on('end', function(chunk) {
        // validate user credentials 
        that.send('signin data received'); 
    });
}); 

function onRequest() {
    console.log('\n\n\n\n\n\nCOASTER\n~~~~~~~~~~\n\n\n\n\n' +
                'Running on port ' + 
                  port +
                ' with Config Values:' +
                '\n'
    );

    // print to console, avoid a library
    console.log(JSON.stringify(app._config, undefined, 2),'\n');
}

app.listen(port, onRequest);
