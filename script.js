document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.querySelector('.search-bar');
    const searchButton = document.querySelector('.search button');
    const cityElement = document.querySelector('.city');
    const tempElement = document.querySelector('.temp');
    const iconElement = document.querySelector('.icon');
    const descriptionElement = document.querySelector('.description');
    const humidityElement = document.querySelector('.humidity');
    const windElement = document.querySelector('.wind');
    const weatherElement = document.querySelector('.weather');
  
    searchButton.addEventListener('click', function () {
      const cityName = searchBar.value;
      if (cityName.trim() !== '') {
        getWeatherData(cityName);
      }
    });
  
    function getWeatherData(cityName) {
      const apiUrl = `https://www.7timer.info/bin/api.pl?lon=0&lat=0&product=civil&output=json&tzshift=0&city=${cityName}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Update HTML elements with the received data
          cityElement.textContent = `Weather in ${cityName}`;
          tempElement.textContent = `${data.dataseries[0].temp2m}°C`;
          iconElement.src = `https://openweathermap.org/img/wn/${data.dataseries[0].weather}/icon.png`;
          descriptionElement.textContent = data.dataseries[0].weather;
          humidityElement.textContent = `Humidity: ${data.dataseries[0].rh2m}%`;
          windElement.textContent = `Wind speed: ${data.dataseries[0].wspd10m} km/h`;
  
          // Remove 'loading' class to display the weather information
          weatherElement.classList.remove('loading');
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  });
  