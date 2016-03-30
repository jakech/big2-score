(function () {
  angular.module('big2score.game', []);

  angular.module('big2score.game').config(function(gameProvider) {
    if(localStorage.getItem('big2score_data')) {
      var game = JSON.parse(localStorage.getItem('big2score_data'));
      var players = game.players;

      console.log('game ', game);
      console.log('players ', players);

      gameProvider.loadPlayers(players);
      gameProvider.loadHistory(game.rounds);
    }
  });

  angular.module('big2score.game').provider('game', function() {
    var rounds;
    var playerNames = [false, false, false, false]; // let Player generate random name


    this.loadPlayers = function(playerNames) {
      playerNames = playerNames;
    };

    this.loadHistory = function(rounds) {
      rounds = rounds;
    }

    this.$get = function(players) {
      return new Game(players(playerNames), rounds);
    };
  });

  function Game(players, rounds) {
    this.created = Date.now();
    this.rounds = rounds || [];
    this.players = players || [];
    this.tallyScores = function(cardsArray) {
      // array of numOfCards according to player's position
      var self = this;

      // [3,4,5,0]
      cardsArray = _.map(cardsArray, function(numOfCards, index) {
        var cards = numOfCards;
        
        // fried
        if(numOfCards > 10) {
          if(numOfCards <= 12) {
            cards = numOfCards * 2
          } else {
            cards = numOfCards * 3
          }
        }

        self.players[index].total += cards;

        return cards;
      });

      // calculate score
      for(var i = 0; i < cardsArray.length; i++) {
        for(var j = 0; j < cardsArray.length; j++) {
          var score = cardsArray[j] - cardsArray[i];
          this.players[i].score += score;
        }
      }

      cardsArray.created = Date.now();

      this.rounds.push(cardsArray);
    }

    this.save = function() {
      var name = 'big2score_data';
      var data = JSON.stringify(this);
      console.log('>>>>>');
      console.log('Saving game... '+ name);
      console.log(data);
      console.log('>>>>>');

      window.localStorage.setItem(name, data);
    }

  }
})();