var express = require( 'express' );
var socketio = require( 'socket.io' );
var logger = require('morgan');
var bodyParser = require('body-parser')


var app = express();


require('./viewConfig')(app)
app.use(bodyParser.urlencoded())
app.use(logger('dev'));

app.use(express.static(__dirname + '/public'))


var server = app.listen(3000)
var io = socketio.listen(server)

var routes = require('./routes')(io)
app.use(routes)



