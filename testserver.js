// server.js

// BASE SETUP
// =============================================================================
var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:2020/consultappdb');
var Question = require('./app/models/question');

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

router.use(function(req, res, next) {
	// do logging
	console.log('Remote Request received successfully.');
	next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// more routes for our API will happen here
// on routes that end in /bears
// ----------------------------------------------------
router.route('/questions')

	// create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function(req, res) {
		
		var question = new Question(); 		// create a new instance of the Bear model
		question.description = req.body.description;  // set the bears name (comes from the request)
    question.title = req.body.title;
    question.question = req.body.question;
		// save the bear and check for errors
		question.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'New consulting question created!' });
		});
		
	})

  .get(function(req, res) {
		Question.find(function(err, questions) {
			if (err)
				res.send(err);

			res.json(questions);
		});
	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

exports = module.exports = app; 						// expose app