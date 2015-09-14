## Coaster.js

Coaster.js is a tiny web framework that provides a template engine (underscore) and some basic restful abstractions to help you to handle all your favorite HTTP requests, including GET, POST, PUT, PATCH and DELETE with the utmost ease. 

#### Installation Instructions

````npm install coaster````

#### Basic Usage

````javascript

mkdir <app_name>
cd <app_name>
touch app.js
mkdir templates
````

in your app.js file, type the following to get started: 

````

var Coaster = require('./lib/coaster');
var app = new Coaster();
var port = process.argv[2] || 5000;
app.define('/test', function(req, res) {
    res.send('This is a test of /test');
});

app.listen(port);

````

Then run your app with `node app.js` and open a webbrowser to `localhost:5000/test`.
