var Work = require('./work');

var app = new Work();

app.define('/', 'GET', function(req, res){
    res.writeHead(200, {
        'Content-type':'text/plain'
    });
    res.write('HEY THERE!');
    res.end();
    console.log('hello, world!');
});

app.listen(4000);
