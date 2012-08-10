
exports.Hangman = function(dictionary) {
    this.uuid = require('node-uuid');
    this.gameState = "notStarted";
    this.people = {};
    this.dictionary = dictionary;
};

exports.Hangman.prototype = {
    getGameState: function (token) {
        if (this.gameState == "notStarted") {
            return {state: this.gameState, actions: ['Join']};
        } else if (this.gameState == 'collectingAttendees') {
            if (token && this.people[token]) {
                return {state:this.gameState, actions:['Start Game']};
            } else {
                return {state:this.gameState, actions:['Join']};
            }
        }
        return {};
    },

    submitEvent: function(params) {
        var action = params.action;
        if (this.gameState == 'notStarted' || this.gameState == 'collectingAttendees') {
            if (action == 'Join') {
                this.gameState = 'collectingAttendees';
                var uuid = this.uuid.v4();
                this.people[uuid] = params.name;
                return {state: this.gameState, actions: ['Start Game'], token: uuid};
            }
        }
    }
};

