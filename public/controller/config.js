app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('task1', {
      url: "/task1",
      templateUrl: "views/task1.html"
    });

  $urlRouterProvider.otherwise("/task1");



});


