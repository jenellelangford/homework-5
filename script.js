  // List of variables
  var cityInput = document.querySelector(".currentHeader");
  var searchList = document.querySelector(".list-group");
  var cityArray = [];

  var storeData = localStorage.getItem("cityStorage");
  if (storeData) {
    cityArray = JSON.parse(storeData)
  };

  function getCity(cityName){
    // API key and URL
    var APIKey = "f19da92a5f341532b71554980a953434";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

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

    //getFiveDayForecast(cityName);
  }




  function renderCities() {
    searchList.textContent = "";

    for (var i = 0; i < cityArray.length; i ++) {
      var liTag = $("<li>");
      liTag.attr("class", "libutton");
      $(".list-group").append(liTag);

      var listbutton = $("<button>");
      listbutton.attr("class", "buttonlist");
      $(liTag).append(listbutton);
      $(listbutton).text(cityArray[i]);

    };
  }
    /*
  function saveToStorage() {
    localStorage.setItem("cityStorage".JSON.stringify(cityArray));
  }
    // these byuttons may not exist yet when this function is called, so try 
    // calling the parent element instead
    $("listbutton").on("click", function() {
      var name = ("userInput").val();
      cityStorage.name = name;
      cityStorage.temp = temp;
      cityStorage.humidity = humidity;
      saveToStorage();
      renderCities();
    })

    */
    
    // Create a click function that populates the search menu and city name
    $("#button").on("click", function (event) {
      event.preventDefault();
      // This updates the title with the name of the city from the user input
      var cityName = $("#userInput").val();


      // This will update the list with the user inputs
      cityArray.push(cityName);
      
      getCity(cityName);
      renderCities();

    // This is the storage for the user input and the list, and will load upon opening the browser
      saveToStorage();


    });

      
//================================================================================================================================================
    // I HAVE REALLY TRIED TO FIGURE THIS OUT IN MULTIPLE WAYS, ASKING QUESTIONS TO GROUP MEMBERS & GOOGLING. 

    /*
    // 5 day forecast URL
      var listOfForecasts = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

      $.ajax({
        url: listOfForecasts,
        method: "GET"
      }).then(function getForecastForEachDay(listOfForecasts) {
          var currentDate = "";

          var forecastArray = [];


          for (var i = 0; i < listOfForecasts.length; i++) {
            // We want to capture one weather object for each day in the list. Once we've captured that
            // object, we can ignore all other objects for the same day
            var dateOfListItem = listOfForecasts[i].dt_txt[0];
            if (dateOfListItem !== currentDate) {
              // We need to extract just the date part and ignore the time
              currentDate = dateOfListItem[0];
              // Push this weather object to the forecasts array
              if (forecastArray.length < 5) {
              listOfForecasts.push(forecastArray[i]);
              }
            }
          }

        getForecastForEachDay(listOfForecasts);
        makeNewCard();

      });



      

 //================================================================================================================================================


       

  function makeNewCard() {
        var cardDate = listOfForecasts.main.date;
        var cardHumidity = listOfForecasts.list.main.humidity;
        var cardTemp = listOfForecasts.list.main.temp;
        var cardTempF = (Math.floor((cardTemp - 273.15) * 1.80 + 32));

        $("div.card-humidity").text("Humidity Level: " + cardHumidity);
        $("div.card-temp").text("Temperature: " + cardTempF + " degrees fahrenheit");
  }
       
  */
