// demo file

var Work = require('./lib/work');
var app = new Work();


app.define('/test', 'GET', function(req, res) {
    // need to be able to say 'say' and 'conclude'
    // this functin needs to run in teh context of an outer function that modifies the res object first
    console.log(res); 
    res.conclude();
});

app.define('/', 'GET', function(req, res) {
    console.log(res);
    
});

console.log(app.router.routes);

app.listen(5000);
