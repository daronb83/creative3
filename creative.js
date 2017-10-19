// App
var newsApp = angular.module('News', ['ui.router'])

// Configuration
var config = newsApp.config([
  '$stateProvider',
  '$urlRouterProvider',

  function($stateProvider, $urlRouterProvider) {
    var home = $stateProvider.state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
    });

    home.state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });

    $urlRouterProvider.otherwise('home');
  }
]);

// Factory
var factory = newsApp.factory('postFactory', [
  function() {
    var o = {
      posts: []
    };

    return o;
  }
]);

// Main controller
var mainCtrl = newsApp.controller('MainCtrl', [
  '$scope',
  'postFactory',

  function($scope, postFactory) {
    $scope.test = 'Hello world!';
    $scope.posts = postFactory.posts;

    $scope.addPost = function(){
      if($scope.formContent === '') {
        return;
      }

      $scope.posts.push({
        title: $scope.formContent,
        upvotes: 0,
        comments: []
      });

      $scope.formContent = '';
    };

    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    };
  }
]);

// Posts controller
var postsCtrl = newsApp.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'postFactory',

  function($scope, $stateParams, postFactory) {
    $scope.post = postFactory.posts[$stateParams.id];

    $scope.addComment = function(){
      if($scope.body === '') {
        return;
      }

      $scope.post.comments.push({
        body: $scope.body,
        upvotes: 0
      });

      $scope.body = '';
    };

    $scope.incrementUpvotes = function(comment){
      comment.upvotes += 1;
    };
  }
]);
