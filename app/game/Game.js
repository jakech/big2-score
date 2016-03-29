(function () {
  angular.module('big2score.game', []);

  angular.module('big2score.game').factory('game', function() {
    return Game;
  });

  function Game(players) {
    this.created = Date.now();
    this.rounds = [];
    this.players = players;

    this.tallyScores = function(cardsArray) {
      // array of numOfCards according to player's position
      var self = this;

      // [3,4,5,0]
      _.each(cardsArray, function(numOfCards, index) {
        self.players[index].total += numOfCards;
      });

      // calculate score
      for(var i = 0; i < cardsArray.length; i++) {
        for(var j = 0; j < cardsArray.length; j++) {
          var score = cardsArray[j] - cardsArray[i];
          console.log(score);
          this.players[i].score += score;
        }
      }

      cardsArray.created = Date.now();

      this.rounds.push(cardsArray);
    }

  }
})();