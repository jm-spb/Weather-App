// Initialize storage and get stored location data
const storage = new Storage();
const weatherLocation = storage.getLocationData();

// Initialize weather object with city stored in Local Storage or with default city
const weather = new Weather(weatherLocation.city);
const ui = new UI();
const ul = document.querySelector('.collection');
const inputCity = document.querySelector('#city');

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeatherOnDomLoaded);

// Fetching rus cities list and save in array only city Names
const citiesNamesArray = fetch(
  'https://gist.githubusercontent.com/jm-spb/75fbab35a9188ac43d22cfef4b2ad27e/raw/e5c21855ac61256b3d2c6130b6ee8c7601539641/rusCities'
)
  .then((response) => {
    if (response.status !== 200) {
      return;
    }
    return response.json();
  })
  .then((result) => {
    let citiesArr = [];
    result.forEach((e) => {
      citiesArr.push(e.city);
    });
    return citiesArr;
  });

inputCity.addEventListener('keyup', typeHelper);

function typeHelper(typedCity) {
  const inputText = typedCity.target.value.toLowerCase();
  citiesNamesArray.then((cityInArray) => {
    let outputList = '';
    let matchedCities = [];

    // Loop through return array from Promise, and save in new array only matched cities with input type
    cityInArray.forEach((city) => {
      if (
        city.toLowerCase().indexOf(inputText) !== -1 &&
        typedCity.target.value !== '' &&
        typedCity.target.value.length > 1
      ) {
        matchedCities.push(city);
      }
    });

    // Limit render cities list
    matchedCities.length = 5;
    matchedCities.forEach((city) => {
      outputList += `<li class="list-group"><a href="#" class="list-group-item list-group-item-action">${city}</a></li>`;
    });
    ul.innerHTML = outputList;
    getWeatherOnCityClick();
  });
}

// Copy city name to input field and invoke getWeather function on click from each city in list
function getWeatherOnCityClick() {
  ul.childNodes.forEach((li) => {
    li.addEventListener('click', (e) => {
      inputCity.value = li.innerText;
      storage.setLocationData(inputCity.value);
      weather.changeLocation(inputCity.value);
      getWeatherOnDomLoaded();
      inputCity.value = '';

      // Hide modal window
      const myModalEl = document.getElementById('locationModal');
      const modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();

      // Clear output List
      ul.innerHTML = '';
    });
  });
}

// Change location
document.getElementById('w-change-btn').addEventListener('click', (e) => {
  weather.changeLocation(city.value);
  getWeatherOnDomLoaded();

  ul.innerHTML = '';
});

function getWeatherOnDomLoaded() {
  weather.getWeatherFromApi().then((result) => ui.paint(result));
}
