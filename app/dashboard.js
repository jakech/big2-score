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
    console.log(form);
    
    var numOfZero = 0;

    _.each(form, function(item) {
      if(!item || item.$viewValue === undefined) {
        return;
      }
      // use coerion
      if(item.$viewValue == 0) {
        numOfZero += 1;
      }
    });

    if(numOfZero !== 1) {
      // form.$setValidity('gameError', false);
      alert('Game must have only one winning player,\nand he/she must have ZERO cards.');
      return;
    }

    form.$setUntouched();
    form.$setPristine();

    var round = _.map(players, function(player) {
      var numOfCards = player.numOfCards;
      player.numOfCards = ''; //reset input
      return numOfCards;
    });

    game.tallyScores(round);
    game.save();
  }
});


// integer validation
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

// sync input focus
angular.module('big2score.dashboard')
  .directive('syncFocusWith', function($timeout, $rootScope) {
    return {
      restrict: 'A',
      scope: {
        focusValue: "=syncFocusWith"
      },
      link: function($scope, $element, attrs) {
        $scope.$watch("focusValue", function(currentValue, previousValue) {
          if (currentValue === true && !previousValue) {
            $element[0].focus();
          } else if (currentValue === false && previousValue) {
            $element[0].blur();
          }
        })
      }
    }
});
