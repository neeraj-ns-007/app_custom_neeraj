'use strict';

var server = require('server');

server.get('Show', function (req, res, next) {

	res.render('customEmailTemplate');
	next();
	
});
server.post('Start', function (req, res, next) {
	var url = req.querystring.data;
	res.json({
		data:url
	})
	next();
})

module.exports = server.exports();