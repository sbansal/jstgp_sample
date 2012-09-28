var http = require('http');

var wtf = '?';

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Function.method('curry',function () {
	var slice = Array.prototype.slice, 
		args = slice.apply(arguments),
		that = this;
	return function() {
		return that.apply(null, args.concat(slice.apply(arguments)));
	};
})

exports.Whoami = function() {
	this.backstoppers = [];
	this.server;
}

	exports.Whoami.prototype = {
		
		
		getQuizSnippet: function(index) {
			var quizHtml;

			quizHtml = '<div><img src="' + this.backstoppers[index].image_url + '"/><input type="text" name="name"/></div>';

			return quizHtml;
		},
		requestProcessor: function(that, req, res) {						
			if (/answer/.test(req.url)){
				
			} else {
				this.htmlResponseBody = '<HTML><HEAD><TITLE>Hello World</TITLE></HEAD>';
				this.htmlResponseBody += '<BODY>';
				this.htmlResponseBody += that.getQuizSnippet(0);
				this.htmlResponseBody += '</BODY></HTML>';

				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(this.htmlResponseBody);
			}		
			
		},
		startServer: function() {			
			var that=this;
			this.server = http.createServer(this.requestProcessor.curry(that)).listen(31337, '127.0.0.1');			
		},
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
			return '<HEAD><TITLE>Hello World</TITLE></HEAD><BODY>mooooO!</BODY>';
		},
		answerQuizSnippet: function(index, answer){
			return this.backstoppers[index].name === answer;    
		}
	};

	exports.Whoami();