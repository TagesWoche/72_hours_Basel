'use strict';

/**
 * @ngdoc overview
 * @name projekteApp
 * @description
 * # projekteApp
 *
 * Main module of the application.
 */

angular.module('projekteApp', ['leaflet-directive']);

'use strict';

angular.module('projekteApp')

  .controller('MarkersSimpleController', [ '$scope', function($scope) {
    var mainMarker = {
      lat: 47.575,
      lng: 7.60,
      focus: true,
      message: 'Hey, drag me if you want',
      draggable: true
    };

    angular.extend($scope, {
      basel: {
        lat: 47.575,
        lng: 7.60,
        zoom: 12
      },
      markers: {
        mainMarker: angular.copy(mainMarker)
      },
      position: {
        lat: 47.575,
        lng: 7.60
      },
      events: { // or just {} //all events
        markers:{
          enable: [ 'dragend' ]
          //logic: 'emit'
        }
      }
    });

    $scope.$on('leafletDirectiveMarker.dragend', function(event, args){
      $scope.position.lat = args.model.lat;
      $scope.position.lng = args.model.lng;
    });

} ]);

angular.module('projekteApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<div class=\"jumbotron\"> <h1>'Allo, 'Allo!</h1> <p class=\"lead\"> <img src=\"images/yeoman.png\" alt=\"I'm Yeoman\"><br> Always a pleasure scaffolding your apps. </p> <p><a class=\"btn btn-lg btn-success\" ng-href=\"#/\">Splendid!<span class=\"glyphicon glyphicon-ok\"></span></a></p> </div> <div class=\"row marketing\"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>"
  );

}]);
