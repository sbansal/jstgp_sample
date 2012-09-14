var http = require('http');

exports.Whoami = function() {
  this.backstoppers = [];
  this.server = 
	http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end('<HEAD><TITLE>Hello World</TITLE></HEAD><BODY>mooooO!</body>');
	}).listen(1337, '127.0.0.1');
}



exports.Whoami.prototype = {
  getStatus: function () {
    return 'not written';
  },
  getBackstoppers: function() {
    return this.backstoppers;
  },
  loadFakeBackstoppers: function() {
    this.backstoppers = [
        {name: "Jake Scruggs", 
            image_url: "https://wiki/w/images/9/98/Jscruggs.jpg"},
        {name: "Bob Scruggs", 
            image_url: "https://wiki/w/images/9/98/Jscruggs.jpg"},
        {name: "Steve Scruggs", 
            image_url: "https://wiki/w/images/9/98/Jscruggs.jpg"}]
  },
  getSampleHtml: function() {
    return '<HEAD><TITLE>Hello World</TITLE></HEAD><BODY>mooooO!</body>';
  }
};
