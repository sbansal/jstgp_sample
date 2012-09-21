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
    // 'should be able to stop the web server': function(topic){
    //      var serverStatus = 'alive?';
    // 
    //      topic.server.close(function () {
    //       serverStatus = 'dead';
    //      });
    // 
    //      setTimeout(function(){assert.equal(serverStatus,'dead');},250);     
    // },
    'should be able to stop the web server but not be insane': function(topic){
        assert.equal(topic.server.close().connections,0);        
    },
    'should generate a character quiz snippet': function(topic){
      assert.match(topic.getQuizSnippet(0), /Jscruggs.jpg/);
      assert.match(topic.getQuizSnippet(0), /input/);
      assert.match(topic.getQuizSnippet(0), /img src/);
    },
    'should tell us if the correct name passes a quiz': function(topic){
      assert.isTrue(topic.answerQuizSnippet(0,'Jake Scruggs'));
    },
    'should tell us if the wrong name fails the quiz': function(topic){
      assert.isFalse(topic.answerQuizSnippet(0,'Frank O\'Hara'));
    },
  }
}).export(module);
