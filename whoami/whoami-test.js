var vows = require('vows'),
  assert = require('assert');

var whoami = require('./whoami');

var Whoami = whoami.Whoami;

vows.describe('The Who am I Engine').addBatch({
  'after starting the app': { 
    topic: new(Whoami),
    'should have zero backstoppers': function(topic) {
      assert.deepEqual(topic.getBackstoppers().length, 0);
    },
    'should have 3 backstoppers after loading data': function(topic){
      topic.loadFakeBackstoppers();
      assert.deepEqual(topic.getBackstoppers().length, 3);
    },	
    'should return an html string when we ask': function(topic){
	  assert.match(topic.getSampleHtml(), /HEAD>/);
	  assert.match(topic.getSampleHtml(), /<\/HEAD>/);
	  assert.match(topic.getSampleHtml(), /<BODY>/);
	  assert.match(topic.getSampleHtml(), /<\/BODY>/);
    },
    'should have a web server': function(topic){
	    assert.isNotNull(topic.server);
    },
    'should be able to stop the web server': function(topic){
	    var serverStatus = 'alive?';
	    topic.server.close(function () { 
			console.log(serverStatus);
		    serverStatus = 'dead';
			console.log(serverStatus);
	    });
	    assert.equal(serverStatus,'dead');
    }

  }
}).export(module);
