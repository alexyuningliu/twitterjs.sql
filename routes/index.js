var express = require('express')
var tweetBank = require('../tweetBank')

//Integration with Models
var User = require('../models/index.js').User;
var Tweet = require('../models/index.js').Tweet;

module.exports = function(io) {
	var router = express.Router()

	router.get('/', function(req, res) {
		var tweetArray = [];



		Tweet.findAll({ include: [ User ] })
		.then(function(tweets) {
			for (var i = 0; i < tweets.length; i++) {
				tweetArray.push(tweets[i].dataValues);
			}

			res.render('index', {
				tweets: tweetArray,
				showForm: true
			})

		});

	})

	router.get('/users/:name', function(req, res) {
		// var tweets = tweetBank.find({name: req.params.name})

		

		res.render('index', {
			tweets: tweets,
			formName: req.params.name,
			showForm: true
		})
	})

	router.get('/users/:name/tweets/:id', function(req, res){
		req.params.id = parseInt(req.params.id)
		var tweets = tweetBank.find({id: req.params.id})
		res.render('index', {
			tweets: tweets
		})
	})

	router.post('/submit', function(req, res){
		tweetBank.add(req.body.name, req.body.text)
		var all_tweets = tweetBank.list()
		var last_tweet = all_tweets[all_tweets.length-1]
		io.sockets.emit('new_tweet', last_tweet)
		res.redirect(req.body.redirectUrl)
	})

	return router
}







