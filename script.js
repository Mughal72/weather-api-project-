let weather = {
  apiKey: "11506647d43a65789394680747e4ad13",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const city = data.city.name;
    const forecastList = data.list;

    // Assuming the first item in the list is for the current day
    const currentDay = forecastList[0];
    const currentTemperature = currentDay.main.temp;
    const currentWeatherDescription = currentDay.weather[0].description;

    // Display current weather information
    document.querySelector(".city").innerText = "Weather in " + city;
    document.querySelector(".temp").innerText = currentTemperature + "°C";
    document.querySelector(".description").innerText = currentWeatherDescription;

    // Display forecast for the next 7 days
    for (let i = 1; i <= 7; i++) {
      const forecast = forecastList[i * 8]; // Forecast every 24 hours, assuming 3-hour intervals
      const dayTemperature = forecast.main.temp;
      const weatherDescription = forecast.weather[0].description;

      // Update UI for each day
      // Example: create elements and append them to a forecast container
      // ...

      // For simplicity, you can log the forecast to the console
      console.log(`Day ${i} - Temperature: ${dayTemperature}°C, Description: ${weatherDescription}`);
    }

    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + city + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Denver");
