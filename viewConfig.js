var swig = require('swig')
module.exports = function(app) {
	app.engine('html', swig.renderFile);

	app.set('view engine', 'html');
	app.set('views', __dirname + '/views');
	swig.setDefaults({ cache: false });

}