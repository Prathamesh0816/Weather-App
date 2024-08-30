const cityInput = document.getElementById("input-city");
const submitBtn = document.getElementById("submit-btn");
const weatherInfoContainer = document.getElementById("weather-info-container");
const cityNameElement = document.getElementById("city-name");
const temperatureElement = document.getElementById("temperature");
const conditionsElement = document.getElementById("conditions");

submitBtn.onclick = handleButtonClick;

function handleButtonClick() {
    const city = cityInput.value.trim();
    fetchWeatherData(city)
      .then(data => updateWeatherUI(data))
      .catch(error => console.error("Error fetching weather data:", error));
  }
  
  function fetchWeatherData(city) {
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=YFPJKFT4UGEYSR43AN4B6ZK9V&contentType=json`;
    return fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      });
  }
  
  function updateWeatherUI(data) {
    const weatherData = data.days[0];
    let cityName = data.address;
    const temperature = weatherData.temp;
    const conditions = weatherData.conditions;
    cityNameElement.textContent = `Weather in ${cityName}`;
    temperatureElement.textContent = `Temperature: ${temperature}°C`;
    conditionsElement.textContent = `Conditions: ${conditions}`;
  
    weatherInfoContainer.style.display = "block";
  }