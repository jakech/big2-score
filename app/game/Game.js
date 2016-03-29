(function () {
  angular.module('big2score.game', []);

  angular.module('big2score.game').factory('game', function() {
    return Game;
  });

  function Game(players) {
    this.created = Date.now();
    this.rounds = [];
    this.players = players;

    this.tallyScores = function(scoreArray) {
      // array of scores according to player's position
      var self = this;
      _.each(scoreArray,function(score, index) {
        self.players[index].total += score;
      });

      scoreArray.created = Date.now();

      this.rounds.push(scoreArray);
    }
  }
})();