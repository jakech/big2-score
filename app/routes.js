angular.module('big2score.routes', ['ui.router']);

angular.module('big2score.routes').config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/dashboard');

  $stateProvider.state('dashboard', {
    url: '/dashboard',
    templateUrl: './pages/dashboard.html',
    controller: 'dashboardCtrl',
    controllerAs: 'dashboard'
  });
});