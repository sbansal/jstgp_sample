var vows = require('vows'),
  assert = require('assert');

var whoami = require('./whoami');

var Whoami = whoami.Whoami;

vows.describe('The Who am I Engine').addBatch({
  'Initializing stuff': { 
    topic: new(Whoami),
    'should have zero backstoppers': function(topic) {
      assert.deepEqual(topic.getBackstoppers().length, 0);
    },
    'should have 3 backstoppers after loading data': function(topic){
      topic.loadFakeBackstoppers();
      assert.deepEqual(topic.getBackstoppers().length, 3);
    }
  }
}).export(module);