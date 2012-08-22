
exports.Hangman = function(dictionary) {
    this.uuid = require('node-uuid');
    this.gameState = "notStarted";
    this.people = {};
    this.dictionary = dictionary;
};

exports.Hangman.prototype = {
    withTokenValidation: function(token, ifValid, ifInvalid, ifMissing) {
        if (token) {
            if (this.people[token]) {
                return ifValid();
            } else {
                return ifInvalid();
            }
        } else {
            return ifMissing();
        }
    },

    getGameState: function (token) {
        if (this.gameState == "notStarted") {
            return {state:this.gameState, actions:['Join']};
        } else if (this.gameState == 'collectingAttendees') {
            var me = this;
            var joinAllowed = function() {
                return {state:me.gameState, actions:['Join']};
            };
            return this.withTokenValidation(token, function() {
                return {state:me.gameState, actions:['Start Game']};
            }, function() {
                var response = joinAllowed();
                response.error = "Player token not recognized";
                return response;
            }, joinAllowed);
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
                return {state:this.gameState, actions:['Start Game'], token:uuid};
            } else if (action == 'Start Game') {
                var invalid = function() { return {started: false, error: "Only existing current players can start the game"}; };
                var result = this.withTokenValidation(params.token,
                    function () {
                        return {started:true};
                    }, invalid, invalid);
                var response = {};
                if (result.started) {
                    response.actions = ['Guess'];
                    this.gameState = 'started';
                } else {
                    response.actions = ['Join'];
                    response.error = result.error;
                }
                response.state = this.gameState;
                return response;
            }
        }
    }
};

