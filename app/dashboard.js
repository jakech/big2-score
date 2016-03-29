angular.module('big2score.dashboard', ['big2score.player']);

angular.module('big2score.dashboard')
  .controller('dashboardCtrl', function(players) {
  
  var vm = this;
  
  // new game
  vm.players = players([false, false, false, false]);
});