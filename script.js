
    // Create a click function that populates the search menu and city name
    $("#button").on("click", function (event) {
      event.preventDefault();

      // List of variables
      var cityInput = document.querySelector(".currentHeader");
      var searchList = document.querySelector(".list-group");
      var cardDate = document.querySelector(".card-humidity");
      var cardHumidity = document.querySelector(".card-humidity");
      var cardTemp = document.querySelector(".card-humidity");

      // This updates the title with the name of the city from the user input
      var cityName = $("#userInput").val();

      // This will update the list with the user inputs
      var cityArray = [];
      cityArray.push(cityName);
      
      for (var i = 0; i < cityArray.length; i ++) {
        var liTag = $("<li>");
        liTag.attr("class", "libutton");
        $(".list-group").append(liTag);

        var listbutton = $("<button>");
        listbutton.attr("class", "buttonlist");
        $(liTag).append(listbutton);

        $(listbutton).text(cityArray);

      };

      // This is the storage for the user input and the list, and will load upon opening the browser

      var cityStorage = {
        name: "",
        temp: "",
        humidity: ""
      }

      function saveToStorage() {
        localStorage.setItem("cityStorage".JSON.stringify(cityStorage));
      }

      function getFromStorage() {
        var storeData = localStorage.getItem("cityStorage");
        if (storeData) {
          cityStorage = JSON.parse(storeData)
        }
        else (
          cityStorage = {}
        )
      }

      function renderData() {
        $("buttonlist").text(cityStorage);
      }

      $("listbutton").on("click", function() {
        var name = ("userInput").val();
        cityStorage.name = name;
        cityStorage.temp = temp;
        cityStorage.humidity = humidity;
        saveToStorage();
        renderData();
      })


      // HERE WE BEGIN THE API AND AJAX PROCESS 


      // API key and URL
      var APIKey = "f19da92a5f341532b71554980a953434";
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

      // The city from the search is then added to our array
      $(".currentHeader").text(cityName);

      // Update the list with the new city
      // Start the ajax function
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {

        var city = response.name;
        var wind = response.wind;
        var windSpeed = wind.speed;
        var windDeg = wind.deg;
        var humidity = response.main.humidity;
        var temp = response.main.temp;
        var tempF = (Math.floor((temp - 273.15) * 1.80 + 32));

        $("div.currentHeader").text(city);
        $("div.windspeed").text("Wind speed: " + windSpeed + " mph at " + windDeg + " degrees");
        $("div.humidity").text("Humidity Level: " + humidity);
        $("div.temp").text("Temperature: " + tempF + " degrees fahrenheit");

      });

    });

      
//================================================================================================================================================



      // 5 day forecast URL
      var listOfForecasts = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

      $.ajax({
        url: listOfForecasts,
        method: "GET"
      }).then(function getForecastForEachDay(listOfForecasts) {
          var currentDate = "";

          var forecastArray = [];
          console.log(forecastArray[0]);


          for (var i = 0; i < listOfForecasts.length; i++) {
            // We want to capture one weather object for each day in the list. Once we've captured that
            // object, we can ignore all other objects for the same day
            var dateOfListItem = listOfForecasts[i].dt_txt.split(" ")[0];
            if (dateOfListItem !== currentDate) {
              // We need to extract just the date part and ignore the time
              currentDate = dateOfListItem.split(" ")[0];
              // Push this weather object to the forecasts array
              if (forecastArray.length < 5) {
                forecastArray.push(listOfForecasts[i]);
              }
            }
          }

        getForecastForEachDay(listOfForecasts);

      });


      

 //================================================================================================================================================


       

       then(function (response) {

        var cardDate = forecastArray.date;
        var cardHumidity = forecastArray.list.main.humidity;
        var cardTemp = forecastArray.list.main.temp;
        var cardTempF = (Math.floor((cardTemp - 273.15) * 1.80 + 32));

        $("div.card-humidity").text("Humidity Level: " + cardHumidity);
        $("div.card-temp").text("Temperature: " + cardTempF + " degrees fahrenheit");



