var Work = require('./work');

var app = new Work();

// should allow developer to omit GET argument, aka argv len 4 okay.
app.define('/', 'GET', function(req, res){
    res.writeHead(200, {
        'Content-type':'text/plain'
    });
    res.write('HEY THERE!');
    res.end();
});

app.listen(4000);
