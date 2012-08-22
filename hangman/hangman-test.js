var vows = require('vows'),
    assert = require('assert');

var hangman = require('./hangman');

var Hangman = hangman.Hangman;

var playerOneToken = null;

vows.describe('The Game Engine').addBatch({
    'when there is no game running': {
        topic: new(Hangman),

        'should be a new game to join': function(game) {
            assert.deepEqual(game.getGameState(), {state: 'notStarted', actions: ['Join']});
        },

        'should be able to join the game': function(game) {
            var result = game.submitEvent({action: 'Join', name: 'Bob Test'});
            assert.equal(result.state, "collectingAttendees");
            assert.equal(result.actions[0], "Start Game");
            assert.isString(result.token);
            playerOneToken = result.token;
            assert.deepEqual(game.getGameState(result.token), {state: 'collectingAttendees', actions: ['Start Game']});
            assert.deepEqual(game.getGameState('junk'), {state: 'collectingAttendees', actions: ['Join'], error: "Player token not recognized"});
        },

        'should be able to accept second attendee': function(game) {
            assert.deepEqual(game.getGameState(), {state: 'collectingAttendees', actions: ['Join']});
            var result = game.submitEvent({action: 'Join', name: 'George Test'});
            assert.equal(result.state, "collectingAttendees");
            assert.equal(result.actions[0], "Start Game");
            assert.isString(result.token);
        },

        "should be able to start the game when player one's token is passed in": function(game) {
            assert.deepEqual(game.getGameState(playerOneToken), {state: 'collectingAttendees', actions: ['Start Game']});
            var result = game.submitEvent({action: 'Start Game'});
            assert.equal(result.state, "collectingAttendees");
            assert.equal(result.actions[0], "Join");
            assert.equal(result.error, "Only existing current players can start the game");

        }
}
}).export(module);