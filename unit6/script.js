// var currentURL = "http://api.openweathermap.org/data/2.5/weather?q={cityname}&APPID=e8df93d43208d9dd2e275275fb8aa604";
// var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q={cityname}&APPID=e8df93d43208d9dd2e275275fb8aa604";

// searchHistory = localStorage.getItem("searchHistoryKey");
//     if (searchHistory == null) {
//         searchHistory = [];
//     } else{
//         searchHistory = JSON.parse(searchHistory);
//         search(searchHistory[0]);
//     }
    
// console.log(searchHistory);

// $("#submit").on("click", function(e) {
//     e.preventDefault();
//     var city = $("#citySearch").val();
//     search(city);
// });

// function search(city){
//     var queryURL = currentURL.replace("{cityname}",city);
//     var fiveDays = fiveDayURL.replace("{cityname}",city);  
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//       .then(function(response) {
//         console.log(JSON.stringify(response,2))
//         });
    
//     $.ajax({
//         url: fiveDays,
//         method: "GET"
//     })
//         .then(function(response) {
//         var parsedResponse = parseFiveDay(response);
//         console.log(parsedResponse);
      
//         //put this in a for loop

//         var date = $("<h3>").addClass("cardDate").text(parsedResponse[i].name + new Date().toLocaleDateString());
//         var card = $("<div>").addClass("cardDiv");
//         var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + parsedResponse.data.weather[0].icon + ".png");
//         var temp = $("<p>").addClass("cardText").text("Temperature" + parsedResponse.data.main.temp + "F");
//         var humidity = $("<p>").addClass("cardText").text("Humidity" + parsedResponse.data.main.humidity + "%");
//         var cardBody = $("<div>").addClass("cardBody");

//         cardBody.append(date,img,temp,humidity);
//         card.append(cardBody);

        

//         //end of for loop
         
//     searchHistory.unshift(city);

//     localStorage.setItem("searchHistoryKey", JSON.stringify(searchHistory));
    
//     var prepend = $(".list-group").prepend("<button>"+ searchHistory[0] +"</button>")
    
//     localStorage.getItem("prepend");
// });

// }
// function parseFiveDay(response){
//     var output = [];
//     for (i=0; i < response.list.length; i += 8){
//     output.push(response.list[i]);
// }
// return output;

// }

// //add a fail function 

// var currentURL = "http://api.openweathermap.org/data/2.5/weather?q={cityname}&APPID=e8df93d43208d9dd2e275275fb8aa604";
// var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q={cityname}&APPID=e8df93d43208d9dd2e275275fb8aa604";
$(document).ready(function () {
    $("#search-button").on("click", function () {
        event.preventDefault();
        var city = $("#citySearch").val();
        // clear input box
        $("#citySearch").val("");
        search(city);
    });
    $(".history").on("click", "li", function () {
        search($(this).text());
    });
    //Creating a Row for search and history
    function makeRow(text) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $(".history").append(li);
    }
    function search(city) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e8df93d43208d9dd2e275275fb8aa604&units=imperial",
            dataType: "json",
            success: function (data) {
                // create history link for this search - I did the history a little different than you had it, feel free to change it back to the way you had it if you please, was having issues 
                if (history.indexOf(city) === -1) {
                    history.push(city);
                    window.localStorage.setItem("history", JSON.stringify(history));
                    makeRow(city);
                }
                // clear any old content
                $("#today").empty();
                // create html content for current weather
                var date = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
                var card = $("<div>").addClass("card");
                var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
                var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
                var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
                var cardBody = $("<div>").addClass("card-body");
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
                // merge and add to page
                date.append(img);
                cardBody.append(date, temp, humid, wind);
                card.append(cardBody);
                $("#today").append(card);
                // call follow-up api endpoints
                getForecast(city);
                getUVIndex(data.coord.lat, data.coord.lon);
            }
        });
    }
    function getForecast(city) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=e8df93d43208d9dd2e275275fb8aa604&units=imperial",
            dataType: "json",
            success: function (data) {
                // overwrite any existing content with date and empty row
                $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
                // loop over all forecasts (by 3-hour increments)
                for (var i = 0; i < data.list.length; i++) {
                    // only look at forecasts around 3:00pm
                    if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                        // create html elements for a bootstrap card
                        var col = $("<div>").addClass("col-md-2");
                        var card = $("<div>").addClass("card bg-primary text-white");
                        var body = $("<div>").addClass("card-body p-2");
                        var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                        var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
                        var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
                        // merge together and put on page
                        col.append(card.append(body.append(title, img, p1, p2)));
                        $("#forecast .row").append(col);
                    }
                }
            }
        });
    }
    function getUVIndex(lat, lon) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=e8df93d43208d9dd2e275275fb8aa604&lat=" + lat + "&lon=" + lon,
            dataType: "json",
            success: function (data) {
                var uv = $("<p>").text("UV Index: ");
                var btn = $("<span>").addClass("btn btn-sm").text(data.value);
                // change color depending on uv value
                if (data.value < 3) {
                    btn.addClass("btn-success");
                } else if (data.value < 7) {
                    btn.addClass("btn-warning");
                } else {
                    btn.addClass("btn-danger");
                }
                $("#today .card-body").append(uv.append(btn));
            }
        });
    }
    // get current history, if any
    var history = JSON.parse(window.localStorage.getItem("history")) || [];
    if (history.length > 0) {
        search(history[history.length - 1]);
    }
    for (var i = 0; i < history.length; i++) {
        makeRow(history[i]);
    }
});