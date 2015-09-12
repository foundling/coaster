var Work = require('./work');
var app = new Work();
app.ext.urlValidate = require('url-validate'); // behind the scenes validation
var port = process.argv[3] || 4000;




// should allow developer to omit GET argument, aka 2 params okay.
app.define('/', 'GET', function(req, res){

    // let developer define app configs like header values elsewhere with a config object, but the in-callback writeHead call can overwrite the config.
    res.say('hi');
    app.render('index'); // template engine
    res.conclude('bye!');
});

app.define('/login', 'POST', function(req, res){

    // let developer define app configs like header values elsewhere with a config object, but the in-callback writeHead call can overwrite the config.
    
    app.validate(req.secure.postData); //secure is where validated things are put (references)
    res.conclude('bye!');
});

app.listen(4000);

