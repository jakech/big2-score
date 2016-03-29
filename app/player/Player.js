(function () {
  angular.module('big2score.player', []);

  angular.module('big2score.player').factory('players', function() {
    function makePlayers(arrayOfNames) {
      // array must have 4 items,
      // pass in 'false' to get a randomly generated name

      if(arrayOfNames.length !== 4) {
        console.error('array must have 4 player names, pass in "false" to get a randomly generated name');
        return;
      }

      var players = arrayOfNames.slice();

      players = _.map(players, function(name) {
        return new Player(name);
      });

      return players;
    }
    return makePlayers;
  });

  function Player(name) {
    this.total = 0;
    this.name = name || chance.name();
    this.avatar = chance.avatar();

    this.changeName = function() {
      var name = window.prompt();

      this.name = name || this.name;
    };
  }
})();
