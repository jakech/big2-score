angular.module('big2score.dashboard', [
  'big2score.game',
  'big2score.player'
]);

angular.module('big2score.dashboard')
  .controller('dashboardCtrl', function(game, players) {
  
  var vm = this;
  var players = players([false, false, false, false]);
  
  // new game
  var game = new game(players);

  // setup view
  vm.game = game;
  vm.tally = function() {
    
    var round = _.map(players, function(player) {
      var numOfCards = player.numOfCards;
      player.numOfCards = ''; //reset input
      return numOfCards;
    });

    game.tallyScores(round);
  }


});