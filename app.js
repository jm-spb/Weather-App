// Initialize storage and get stored location data
const storage = new Storage();
const weatherLocation = storage.getLocationData();

// Initialize weather object with city stored in Local Storage or with default city
const weather = new Weather(weatherLocation.city);
const ui = new UI();

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeatherOnDomLoaded);

// Change location
document.getElementById('w-change-btn').addEventListener('click', (e) => {
  const city = document.getElementById('city').value;
  weather.changeLocation(city);

  // Set location in Local Storage
  storage.setLocationData(city);

  getWeatherOnDomLoaded();
  e.preventDefault();
});

function getWeatherOnDomLoaded() {
  weather
    .getWeatherFromApi()
    .then((result) => ui.paint(result))
    .catch((err) => console.log(err));
}
