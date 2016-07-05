// SETUP ====================================================================
var express  = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var app      = express(); 								    		// create our app with express
var port  	 = process.env.PORT || 3000; 				    		// set the port

// CONFIG ===================================================================

app.use(express.static(__dirname + '/generated')); 		// set the static files location /public/img will be /img for users
app.use(logger('dev'));					                // log every request to the console
app.use(bodyParser.json());                             // parse application/json
app.use(methodOverride());                              // simulate DELETE and PUT

// LISTEN ===================================================================
app.listen(port);
console.log("App listening on port " + port);