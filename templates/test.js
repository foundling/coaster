var _ = require('underscore');
var compiled = _.template("hello: <%= name %>");

compiled({name: 'moe'});
