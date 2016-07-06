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
