var vows = require('vows'),
  assert = require('assert');

var whoami = require('./whoami');

var Whoami = whoami.Whoami;

vows.describe('The Who am I Engine').addBatch({
  'Initializing stuff': { 
		topic: new(Whoami),
		'should be a response to status request': function(app) {
			assert.deepEqual(app.getStatus(), {state: 'ack!'});
		}
	}
}).export(module);