// App
var charApp = angular.module('Character', ['ui.router'])

// Configuration
var config = charApp.config([
  '$stateProvider',
  '$urlRouterProvider',

  function($stateProvider, $urlRouterProvider) {
    var home = $stateProvider.state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
    });

    var c = $stateProvider.state('characters', {
      url: '/characters/{id}',
      templateUrl: '/characters.html',
      controller: 'charactersCtrl'
    });

    $urlRouterProvider.otherwise('home');
  }
]);

// Factory
var factory = charApp.factory('charFactory', [
  function() {
    var o = {
      chars: []
    };

    return o;
  }
]);

// Main controller
var mainCtrl = charApp.controller('MainCtrl', [
  '$scope',
  'charFactory',

  function($scope, charFactory) {
    $scope.chars = charFactory.chars;
    $scope.genders = ["male", "female"];

    $scope.addCharacter = function(){
      if($scope.name === '') {
        return;
      }

      $scope.chars.push({
        name: $scope.name,
        gender: $scope.gender,
        attributes: {
          hair: "Black",
          eye: "Black",
          skin: "Fair",
          outfit: "Simple"
        }
      });

      console.log(charFactory.chars);

      $scope.name = '';
      $scope.gender = '';
    };
  }
]);

// characters controller
var charactersCtrl = charApp.controller('charactersCtrl', [
  '$scope',
  '$stateParams',
  'charFactory',

  function($scope, $stateParams, charFactory) {
    $scope.char = charFactory.chars[$stateParams.id];

    $scope.hairColors = ["Black", "Brown", "Yellow", "Red", "White"];
    $scope.eyes = ["Green", "Blue", "Brown", "Black"];
    $scope.skinColors = ["Fair", "Tan", "Black"];
    $scope.outfits = ["Simple", "Woodsy", "Emo"];

    $scope.addAttributes = function(){
      //console.log("stateParams: " + $stateParams.id);
      //console.log($scope.char);

      if($scope.hair === '') {
        return;
      }

      $scope.char.attributes = {
        hair: $scope.hair,
        eye: $scope.eye,
        skin: $scope.skin,
        outfit: $scope.outfit,
        personality:$scope.personality
      };

      //console.log($scope.char.attributes);
    };
  }
]);
