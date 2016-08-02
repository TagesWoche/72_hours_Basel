'use strict';

angular.module('projekteApp')

    .controller('showHideMapCtrl', ['$scope', function($scope) {

        /* toggle visibility of map */

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

        /* filter for week days 

        $scope.filterByDay = '';
        $scope.setDateFriday = new Date('2016, 07, 27');
        $scope.getDatetime = new Date(); // get the day from user agent
        $scope.getDatetime.setHours(0,0,0,0); // reset hours to zero in order to be able to compare the values

        if ($scope.getDatetime.valueOf() >= $scope.setDateFriday.valueOf())
        {
            $scope.filterByDay = 'Freitag';
        }
        else
        {
            $scope.filterByDay = 'Samstag';
        }
*/
        /* load the content from dataService */

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

    .controller('mapCtrl', [ '$scope', 'dataService', 'screenSize', function ($scope, dataService, screenSize) {

        /* set the map positions on mobile and desktop */

        if (screenSize.is('xs, sm'))
        {
            // on mobile
            $scope.latitude =  47.568;
            $scope.longitude = 7.605;
            $scope.zoom = 15;
        }
        else
        {
            // on desktop
            $scope.latitude =  47.568;
            $scope.longitude = 7.63;
            $scope.zoom = 13;
        }

        /* get the data for the markers array from the dataService */

        $scope.markers = [];

        $scope.httpStatus = 0;
        $scope.LoadRequest = dataService.loadSpreadsheetData();
        dataService.loadSpreadsheetData()

        .then(function (results) {
            console.log(results);
            for (var i = 0; i < results.length; i++){
                $scope.markers.push({
                    lat: parseFloat(results[i].gsx$latitude.$t),  //use parseFloat() to convert string to integer
                    lng: parseFloat(results[i].gsx$longitude.$t),
                    getMessageScope: function () { return $scope; },
                    message: '<h2>' + results[i].gsx$titelkarte.$t + '</h2><p>' + results[i].gsx$beschreibungkarte.$t + '</p><a href="#' + results[i].gsx$tag.$t + results[i].gsx$stunde.$t +'" target="_self" ng-click="toggleMap()">Weiterlesen »</a>',
                    icon: eval('localIcons' + '.' + results[i].gsx$kategorie.$t), //use eval() to convert string to variable
                    layer: results[i].gsx$kategorie.$t
                });
            }
            console.log($scope.markers);
        });

        /* define the icon style for the map markers */

        var localIcons = {
            Essen: {
                iconUrl: 'images/testmarker.png',
                shadowUrl: 'images/testmarker-shadow.png',
                iconSize:     [50, 63], // size of the icon
                shadowSize:   [50, 63], // size of the shadow
                iconAnchor:   [50, 63], // point of the icon which will correspond to marker's location
                shadowAnchor: [30, 63],  // the same for the shadow
                popupAnchor:  [-26, -66] // point from which the popup should open relative to the iconAnchor
            },
            Erleben: {
                iconUrl: 'images/testmarker.png',
                shadowUrl: 'images/testmarker-shadow.png',
                iconSize:     [50, 63], // size of the icon
                shadowSize:   [50, 63], // size of the shadow
                iconAnchor:   [50, 63], // point of the icon which will correspond to marker's location
                shadowAnchor: [30, 63],  // the same for the shadow
                popupAnchor:  [-26, -66] // point from which the popup should open relative to the iconAnchor
            },
            Tanzen: {
                iconUrl: 'images/testmarker.png',
                shadowUrl: 'images/testmarker-shadow.png',
                iconSize:     [50, 63], // size of the icon
                shadowSize:   [50, 63], // size of the shadow
                iconAnchor:   [50, 63], // point of the icon which will correspond to marker's location
                shadowAnchor: [30, 63],  // the same for the shadow
                popupAnchor:  [-26, -66] // point from which the popup should open relative to the iconAnchor
            },
            Trinken: {
                iconUrl: 'images/testmarker2.png',
                shadowUrl: 'images/testmarker-shadow.png',
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

                // define the layers
                overlays: {
                    Essen: {
                        type: 'group',
                        name: 'Essen',
                        visible: true
                    },
                    Erleben: {
                        type: 'group',
                        name: 'Erleben',
                        visible: true
                    },
                    Trinken: {
                        type: 'group',
                        name: 'Trinken',
                        visible: true
                    },
                    Tanzen: {
                        type: 'group',
                        name: 'Tanzen',
                        visible: true
                    }
                }
            },

            // center position
            basel: {
                lat: $scope.latitude,
                lng: $scope.longitude,
                zoom: $scope.zoom
            },

            defaults: {
                scrollWheelZoom: false
            },

            // function to toggle different layers
            toggleLayer: function(type) {
                $scope.layers.overlays[type].visible = !$scope.layers.overlays[type].visible;
            },

            events: {
            }

        });

    }]);