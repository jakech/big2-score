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
  vm.tally = function(form) {
    form.$setUntouched();
    form.$setPristine();

    var round = _.map(players, function(player) {
      var numOfCards = player.numOfCards;
      player.numOfCards = ''; //reset input
      return numOfCards;
    });

    game.tallyScores(round);
  }
});

angular.module('big2score.dashboard')
  .directive('integer', function() {
  var INTEGER_REGEXP = /^\-?\d+$/;
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.integer = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (INTEGER_REGEXP.test(viewValue)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});