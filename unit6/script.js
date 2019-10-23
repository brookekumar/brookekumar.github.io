var currentURL = "http://api.openweathermap.org/data/2.5/weather?q={cityname}&APPID=e8df93d43208d9dd2e275275fb8aa604";
var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q={cityname}&APPID=e8df93d43208d9dd2e275275fb8aa604";

searchHistory = localStorage.getItem("searchHistoryKey");
    if (searchHistory == null) {
        searchHistory = [];
    } else{
        searchHistory = JSON.parse(searchHistory);
        search(searchHistory[0]);
    }
    
console.log(searchHistory);

$("#submit").on("click", function(e) {
    e.preventDefault();
    var city = $("#citySearch").val();
    search(city);
});

function search(city){
    var queryURL = currentURL.replace("{cityname}",city);
    var fiveDays = fiveDayURL.replace("{cityname}",city);  
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(JSON.stringify(response,2))
        });
    
    $.ajax({
        url: fiveDays,
        method: "GET"
    })
        .then(function(response,data) {
        var parsedResponse = parseFiveDay(response);
        console.log(JSON.stringify(parsedResponse,2))
        });

        var date = $("<h3>").addClass("cardDate").text(data.name + new Date().toLocaleDateString());
        var card = $("<div>").addClass("cardDiv");
        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        var temp = $("<p>").addClass("cardText").text("Temperature" + data.main.temp + "F");
        var humidity = $("<p>").addClass("cardText").text("Humidity" + data.main.humidity + "%");
        var cardBody = $("<div>").addClass("cardBody");

        cardBody.append(date,img,temp,humidity);
        card.append(cardBody);
         
    searchHistory.unshift(city);

    localStorage.setItem("searchHistoryKey", JSON.stringify(searchHistory));
    
    var prepend = $(".list-group").prepend("<button>"+ searchHistory[0] +"</button>")
    
    localStorage.getItem("prepend");
}
function parseFiveDay(response){
    var output = [];
    for (i=0; i < response.list.length; i += 8){
    output.push(response.list[i]);
}
return output;

}

//add a fail function 