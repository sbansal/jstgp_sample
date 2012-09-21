var http = require('http');

exports.Whoami = function() {
  var that = this;
  
  this.backstoppers = [];
  this.server = 
	http.createServer(function (req, res) {
    this.htmlResponseBody = '<HTML><HEAD><TITLE>Hello World</TITLE></HEAD>';
    this.htmlResponseBody += '<BODY>';
    this.htmlResponseBody += exports.Whoami.getQuizSnippet(0);
    this.htmlResponseBody += '</BODY></HTML>';

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(this.htmlResponseBody);
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
    return '<HEAD><TITLE>Hello World</TITLE></HEAD><BODY>mooooO!</BODY>';
  },
  getQuizSnippet: function(index) {
    var quizHtml;
    
    quizHtml = '<div><img src=' + this.backstoppers[index].image_url + '/><input type="text" name="name"/></div>';
    
    return quizHtml;
  },
  answerQuizSnippet: function(index, answer){
    return this.backstoppers[index].name === answer;    
  }
};

exports.Whoami();