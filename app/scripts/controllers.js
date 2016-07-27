'use strict';

angular.module('projekteApp')

    .controller('showHideMapCtrl', ['$scope', function($scope) {
        $scope.showmap = true;
        $scope.buttonText = 'Tour beginnen';

        $scope.toggleMap = function(){
            if ($scope.showmap === true)
            {
                $scope.buttonText = 'Karte anzeigen';
                $scope.showmap = false;
            }
            else
            {
                $scope.buttonText = 'Tour beginnen';
                $scope.showmap = true;
            }
        };
    }])

    .controller('dataFeedCtrl', ['$scope', 'dataService', function ($scope, dataService) {

        /* filter for week days */

        $scope.filterByDay = '';
        $scope.setDateFriday = new Date('2016, 07, 27');
        $scope.getDatetime = new Date(); // get the day from user agent
        $scope.getDatetime.setHours(0,0,0,0);

        if ($scope.getDatetime.valueOf() >= $scope.setDateFriday.valueOf())
        {
            $scope.filterByDay = 'Freitag';
        }
        else
        {
            $scope.filterByDay = 'Samstag';
        }

        $scope.parsedEntries = [];
        $scope.httpStatus = 0;
        $scope.LoadRequest = dataService.loadSpreadsheetData();
        dataService.loadSpreadsheetData()
            .then(function(results){
                for (var i = 0; i < results.length; i++){
                    $scope.parsedEntries.push({
                        titel: results[i].gsx$titel.$t,
                        inhalt: results[i].gsx$inhalt.$t,
                        tag: results[i].gsx$tag.$t,
                        stunde: results[i].gsx$stunde.$t,
                        images: results[i].gsx$images.$t,
                        datum: results[i].gsx$tag.$t + results[i].gsx$stunde.$t

                    });
                    }

                console.log($scope.parsedEntries);

                });

    }])

    .controller('mapCtrl', [ '$scope', 'dataService', function ($scope, dataService) {

        $scope.markers = [];

        $scope.httpStatus = 0;
        $scope.LoadRequest = dataService.loadSpreadsheetData();
        dataService.loadSpreadsheetData()

        .then(function (results) {
            console.log(results);
            for (var i = 0; i < results.length; i++){
                $scope.markers.push({
                    lat: parseFloat(results[i].gsx$latitude.$t),
                    lng: parseFloat(results[i].gsx$longitude.$t),
                    getMessageScope: function () { return $scope; },
                    message: '<h2>' + results[i].gsx$titelkarte.$t + '</h2><p>' + results[i].gsx$beschreibungkarte.$t + '</p><a href="/#' + results[i].gsx$tag.$t + results[i].gsx$stunde.$t +'" target="_self" ng-click="toggleMap()">Weiterlesen »</a>',
                    icon: eval('localIcons' + '.' + results[i].gsx$kategorie.$t),
                    layer: results[i].gsx$kategorie.$t
                });
            }
            console.log($scope.markers);
        });

        var localIcons = {
            hotels: {
                iconUrl: '../images/testmarker.png',
                shadowUrl: '../images/testmarker-shadow.png',
                iconSize:     [50, 63], // size of the icon
                shadowSize:   [50, 63], // size of the shadow
                iconAnchor:   [50, 63], // point of the icon which will correspond to marker's location
                shadowAnchor: [30, 63],  // the same for the shadow
                popupAnchor:  [-26, -66] // point from which the popup should open relative to the iconAnchor
            },
            restaurants: {
                iconUrl: '../images/testmarker2.png',
                shadowUrl: '../images/testmarker-shadow.png',
                iconSize:     [50, 63], // size of the icon
                shadowSize:   [50, 63], // size of the shadow
                iconAnchor:   [50, 63], // point of the icon which will correspond to marker's location
                shadowAnchor: [30, 63],  // the same for the shadow
                popupAnchor:  [-26, -66] // point from which the popup should open relative to the iconAnchor
            }
        };

        angular.extend($scope, {


            layercontrol: {
                icons: {
                    uncheck: 'fa fa-toggle-off',
                    check: 'fa fa-toggle-on'
                }
            },


            layers: {
                baselayers: {
                    TonerMap: {
                        name: 'Basel in Schwarz Weiss',
                        type: 'xyz',
                        url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png'
                    },
                    openStreetMap: {
                        name: 'ganz normale Karte',
                        type: 'xyz',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    }
                },
                overlays: {
                    hotels: {
                        type: 'group',
                        name: 'hotels',
                        visible: true
                    },

                    restaurants: {
                        type: 'group',
                        name: 'restaurants',
                        visible: true
                    }
                }
            },

            basel: {
                // lat: 47.568, lng: 7.605, mobile best position
                lat: 47.568, lng: 7.63, // desktop best position
                zoom: 13
            },

            defaults: {
                scrollWheelZoom: false
            },

            toggleLayer: function(type) {
                $scope.layers.overlays[type].visible = !$scope.layers.overlays[type].visible;
            },

            events: {
                markers: {
                    enable: [ 'dragend' ]
                }
            }

        });

    }]);