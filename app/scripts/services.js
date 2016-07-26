'use strict';

angular.module('projekteApp')
    .factory('dataService', [
        '$q', '$http',
        function ($q, $http) {
            var loadSpreadsheetData = function(){
                console.log('loading..');
                var deferred = $q.defer();
                var sheet = 'od6';
                var key = '1ymI_YXjTl1qkOzCTHWTMlwI6T3kc4ix3hhdq9Cfw_Yo';
                var url = 'http://spreadsheets.google.com/feeds/list/' + key + '/' + sheet + '/public/values?alt=json-in-script';

                $http.jsonp(url + '&callback=JSON_CALLBACK')
                    .success(function(data){
                        console.log('!!', data);
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
        }]);