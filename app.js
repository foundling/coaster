// demo file

var Work = require('./lib/work');
var app = new Work();


app.define('/test', 'GET', function(req, res) {
    console.log(res);
    
});

console.log(app.router.routes);

app.listen(5000);
