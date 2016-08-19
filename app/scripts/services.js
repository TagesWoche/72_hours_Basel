'use strict';

angular.module('projekteApp')
    .factory('dataService', ['$q', '$http', function ($q, $http) {

        // load spreadsheet data

        var loadSpreadsheetData = function(){
            var deferred = $q.defer();

            // identify the spreadsheet
            var sheet = 'od6';
            var key = '1ymI_YXjTl1qkOzCTHWTMlwI6T3kc4ix3hhdq9Cfw_Yo';
            var url = 'http://spreadsheets.google.com/feeds/list/' + key + '/' + sheet + '/public/values?alt=json-in-script';

            // get the data
            $http.jsonp(url + '&callback=JSON_CALLBACK')
                .success(function(data){
                    var results = [];
                    var feed = data.feed;
                    var entries = feed.entry || [];
                    for (var i=0; i<entries.length; i++){
                        var value = entries[i];
                        results.push(value);
                    }
                    deferred.resolve(results);
                })
                .error(function(reason){
                    deferred.reject(reason);
                });
            return deferred.promise;
        };
        return {
            loadSpreadsheetData: loadSpreadsheetData
        };
    }])

    .factory('dateFilter', function () {

        var setDateFriday = new Date('2016, 08, 26');
        var setDateSaturday = new Date('2016, 08, 27');
        var setDateSunday = new Date('2016, 08, 28');

        // get the day from user agent
        var getDatetime = new Date();
        getDatetime.setHours(0,0,0,0); // reset hours to zero in order to be able to compare the values

        return {
            setDateFriday : setDateFriday,
            setDateSaturday: setDateSaturday,
            setDateSunday: setDateSunday,
            getDatetime: getDatetime

        };

    });
