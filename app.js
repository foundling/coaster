var Work = require('./work');
var app = new Work();
//app.ext.urlValidate = require('url-validate'); // behind the scenes validation
var port = process.argv[3] || 4000;


// app.myConfig['head'] = 202;
// app.myConfig['mime'] = {'Content-Type':'application/JSON'};

app.config('templates', '/home/phylp/Desktop/framework/templates');

// should allow developer to omit GET argument, aka 2 params okay.
app.define('/test', 'GET', function(req, res){
    // let developer define app configs like header values elsewhere with a config object, but the in-callback writeHead call can overwrite the config.
    //res.say('hi');
    app.say(req, res, 'testing');
    console.log('hey the test path works')
    // app.render(req,res,'index.html'); // template engine
    //res.conclude('bye!');
});

app.define('/other', 'GET', function(req, res){
    //app.say(req, res, 'what else can we do?');
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




/* NOTES
- not sure if conclude can be implemented because res.end is
necessary for other helper functions to work

-how do we render a view? No native method available in Node

-what is purpose of say is we are rendering a view?
*/
