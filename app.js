var Work = require('./work');
var app = new Work();
var port = process.argv[3] || 4000;

// should allow developer to omit GET argument, aka 2 params okay.
app.define('/', 'GET', function(req, res){

    // let developer define app configs like header values elsewhere with a config object, but the in-callback writeHead call can overwrite the config.
    res.conclude('hi!');
});

app.listen(4000);


