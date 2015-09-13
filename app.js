var Work = require('./work');
var app = new Work();
//app.ext.urlValidate = require('url-validate'); // behind the scenes validation
var port = process.argv[2] || 4000;


app.config('templates', '/home/phylp/Desktop/framework/templates');

// should allow developer to omit GET argument, aka 2 params okay.
app.define('/test', 'GET', function(req, res){
    // let developer define app configs like header values elsewhere with a config object, but the in-callback writeHead call can overwrite the config.
    app.say(req, res, 'testing');
    console.log('hey the test path works');
});
app.define('/', 'GET', function(req, res){
    // let developer define app configs like header values elsewhere with a config object, but the in-callback writeHead call can overwrite the config.
    app.say(req, res, 'testing');
    console.log('hey the test path works');
});

app.define('/favicon.ico', 'GET', function(req, res){
    // let developer define app configs like header values elsewhere with a config object, but the in-callback writeHead call can overwrite the config.
    app.say(req, res, 'favicon!');
    console.log('hey the favicon path works');
});



app.define('/other', 'GET', function(req, res){
    var obj = {
                  'name':'bob',
                  'age' : 10
                };
    app.render(res, 'index.html', obj);
});


app.define('/login', 'POST', function(req, res){

    // let developer define app configs like header values elsewhere with a config object, but the in-callback writeHead call can overwrite the config.
    
    app.validate(req.secure.postData); //secure is where validated things are put (references)
    res.conclude('bye!');
});

app.listen(4000);
