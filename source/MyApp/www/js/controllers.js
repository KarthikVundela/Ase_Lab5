angular.module('app.controllers', [])

.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('registerCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
  var MashupApp = function ($scope, $http) {
    $scope.venueList = new Array();
    $scope.mostRecentReview;
    $scope.getVenues = function () {
      var placeEntered = document.getElementById("txt_placeName").value;
      var searchQuery = document.getElementById("txt_searchFilter").value;
      if (placeEntered != null && placeEntered != "" && searchQuery != null && searchQuery != "") {
        document.getElementById('div_ReviewList').style.display = 'none';
        //This is the API that gives the doc details
        var handler = $http.get("https://api.betterdoctor.com/2016-03-01/doctors?query="+sourceText+"&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=a209acf0a97349970d5d7e652c439475"+
          "&near=" + placeEntered +
          "&query=" + searchQuery);
        handler.success(function (data) {

          if (data != null && data.response != null && data.response.venues != undefined && data.response.venues != null) {
            for (var i = 0; i < data.response.venues.length; i++) {
              $scope.venueList[i] = {
                "name": data.response.venues[i].name,
                "id": data.response.venues[i].id,
                "location": data.response.venues[i].location
              };
            }
          }

        })
        handler.error(function (data) {
          alert("There was some error processing your request. Please try after some time.");
        });
      }
    }
    $scope.getReviews = function (venueSelected) {
      if (venueSelected != null) {
        //This is the API call being made to get the reviews(tips) for the doc details
        var handler = $http.get("https://api.betterdoctor.com/2016-03-01/doctors?query="+sourceText+"&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=a209acf0a97349970d5d7e652c439475");
        handler.success(function (result) {
          if (result != null && result.response != null && result.response.tips != null &&
            result.response.tips.items != null) {
            $scope.mostRecentReview = result.response.tips.items[0];
            //This is the Alchemy API for getting the sentiment of the most recent review for a place.
            var callback = $http.get("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment" +
              "?apikey=6c4e6b20afd82816ead4f7a9ae2d59b18644a890" +
              "&outputMode=json&text=" + $scope.mostRecentReview.text);
            callback.success(function (data) {
              if(data!=null && data.docSentiment!=null)
              {
                $scope.ReviewWithSentiment = {"reviewText" : $scope.mostRecentReview.text,
                  "sentiment":data.docSentiment.type,
                  "score":data.docSentiment.score  };
                document.getElementById('div_ReviewList').style.display = 'block';


              }
            })
          }
        })
        handler.error(function (result) {
          alert("There was some error processing your request. Please try after some time.")
        })
      }

    }
  };

}])

