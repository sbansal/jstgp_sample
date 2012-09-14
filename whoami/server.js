var http = require('http');
/*
exports.Server = function() {
	var server;
}

exports.Server.prototype = {
*/
	http.createServer(function (req, res) {
		  res.writeHead(200, {'Content-Type': 'text/html'});
		    res.end('<HEAD><TITLE>Hello World</TITLE></HEAD><BODY>mooooO!</body>');
	}).listen(1337, '127.0.0.1');
// `};
console.log('Server running at http://127.0.0.1:1337/');
