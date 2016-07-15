'use strict';

angular.module('projekteApp')



.controller('MarkersController', [ '$scope', function($scope) {
    
    var local_icons = {
        icon1: {
            iconUrl: '../images/testmarker.png',
            shadowUrl: '../images/testmarker-shadow.png',
            iconSize:     [50, 63], // size of the icon
            shadowSize:   [50, 63], // size of the shadow
            iconAnchor:   [50, 63], // point of the icon which will correspond to marker's location
            shadowAnchor: [30, 63],  // the same for the shadow
            popupAnchor:  [-26, -66] // point from which the popup should open relative to the iconAnchor
        },
        icon2: {
            iconUrl: '../images/testmarker2.png',
            shadowUrl: '../images/testmarker-shadow.png',
            iconSize:     [50, 63], // size of the icon
            shadowSize:   [50, 63], // size of the shadow
            iconAnchor:   [50, 63], // point of the icon which will correspond to marker's location
            shadowAnchor: [30, 63],  // the same for the shadow
            popupAnchor:  [-26, -66] // point from which the popup should open relative to the iconAnchor
        },
    };
                   
    angular.extend($scope, {
        
        icons: local_icons,
        
        layercontrol: {
            icons: {
                uncheck: "fa fa-toggle-off",
                check: "fa fa-toggle-on"
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
        
        markers: {
            bar1: {
                layer: 'hotels',
                lat: 47.575,
                lng: 7.61,
                focus: false,
                message: '<h2>Grenzwert</h2><p>Kleine Bar mit Fümoir</p><a href="/#Samstag11" target="_self" onclick="javascript:hidemap(); javascript:changeText();">Weiterlesen »</a>',
                draggable: false,
                icon: local_icons.icon1,
            },
            bar2: {
                layer: 'restaurants',
                lat: 47.575,
                lng: 7.62,
                focus: false,
                message: '<h2>Plantanenhof</h2><p>Gutes Essen mit schönem Garten.</p><a href="/#Samstag10" target="_self" onclick="javascript:hidemap(); javascript:changeText();">Weiterlesen »</a>',
                draggable: false,
                icon: local_icons.icon2,
            }
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
      
    
/*
    $scope.$on('leafletDirectiveMarker.dragend', function(event, args){
      $scope.position.lat = args.model.lat;
      $scope.position.lng = args.model.lng;
    });
    
*/

  }])

    .controller('dataFeed', ['$scope', '$http', function($scope,$http) {

    var spreadsheet = 'od6';
    var spreadsheetID = '1ymI_YXjTl1qkOzCTHWTMlwI6T3kc4ix3hhdq9Cfw_Yo';
    var url = 'http://spreadsheets.google.com/feeds/list/' + spreadsheetID + '/' + spreadsheet + '/public/values?alt=json';

    var parse = function(entry) {
        console.log(entry);
        var titel = entry['gsx$titel']['$t'];
        var inhalt = entry['gsx$inhalt']['$t'];
        var images = entry['gsx$images']['$t'];
        var tag = entry['gsx$tag']['$t'];
        var stunde = entry['gsx$stunde']['$t'];
        var datum = tag + stunde;
        return {
            titel: titel,
            inhalt: inhalt,
            images: images,
            tag: tag,
            stunde: stunde,
            datum: datum
        };
        
    };
    $http.get(url)
        .success(function(response) {
            var key;
            var entries = response['feed']['entry'];
            $scope.parsedEntries = [];
            for (key in entries) {
                var content = entries[key];
                $scope.parsedEntries.push(parse(content));
                console.log(content);
            }
        }).error(function (data, status, headers, config) {
        alert("error");
        return status;
    });
}]);


// change content of startbutton 
function changeText() {
    var element = document.getElementById('startbutton');
    if (element.innerHTML === 'Tour beginnen') element.innerHTML = 'Karte anzeigen';
        else {
            element.innerHTML = 'Tour beginnen';
        }
    };

/* 
Change Text of more buttons » unused
function changeTextHotels() {
    var element = document.getElementById('hotelsbutton');
    if (element.innerHTML === 'Hotels ausblenden') element.innerHTML = 'Hotels einblenden';
        else {
            element.innerHTML = 'Hotels ausblenden';
        }
    };

function changeTextRestaurants() {
    var element = document.getElementById('restaurantbutton');
    if (element.innerHTML === 'Restaurants ausblenden') element.innerHTML = 'Restaurants einblenden';
        else {
            element.innerHTML = 'Restaurants ausblenden';
        }
    };
*/
// add hide class to map

function hidemap() {
    var element = document.getElementById('mapContainer');
    if ( document.getElementById("mapContainer").className.match(/(?:^|\s)hide(?!\S)/) ) document.getElementById("mapContainer").className = document.getElementById("mapContainer").className.replace ( /(?:^|\s)hide(?!\S)/g , '' )
        else {
            document.getElementById("mapContainer").className += " hide";
        }
};



