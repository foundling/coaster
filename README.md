[![Build Status](https://travis-ci.org/foundling/coaster.svg?branch=modular)](https://travis-ci.org/foundling/coaster)
## Coaster.js

Coaster.js is a tiny web framework that provides a template engine (underscore) and some basic restful abstractions to help you to handle all your favorite HTTP requests, including GET, POST, PUT, PATCH and DELETE with the utmost, magic-free ease. 

#### Hard Dependencies
+ Underscore (hooks into more templating engines forthcoming).

#### Installation Instructions

````npm install coaster````

#### Basic Usage

````bash

$ mkdir <app_name>
$ cd <app_name>
$ touch app.js
$ mkdir templates
````

Type the following in your app.js file to get started:

````

var Coaster = require('./lib/coaster');
var app = new Coaster();
var port = process.argv[2] || 5000;
app.define('/test', function(req, res) {
    res.send('This is a test of /test');
});

app.listen(port);

````

Then run your app on the command-line with `node app.js` and point your browser to `localhost:5000/test`.

````

    
