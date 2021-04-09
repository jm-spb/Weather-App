// Initialize storage and get stored location data
const storage = new Storage();
const weatherLocation = storage.getLocationData();

// Initialize weather object with city stored in Local Storage or with default city
const weather = new Weather(weatherLocation.city);
const ui = new UI();
const ul = document.querySelector('.collection');
const filter = document.querySelector('#city');

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeatherOnDomLoaded);

// Fetching rus cities list
function fetching() {
  fetch(
    'https://gist.githubusercontent.com/jm-spb/75fbab35a9188ac43d22cfef4b2ad27e/raw/e5c21855ac61256b3d2c6130b6ee8c7601539641/rusCities'
  ).then(async (response) => {
    if (response.status !== 200) {
      return;
    }
    const data = await response.json();

    let output = '';
    data.forEach((e) => {
      output += `<li id="list" style="display:none"><a href="#" class="list-group-item list-group-item-action">${e.city}</a></li>`;
    });

    ul.innerHTML = output;

    // Copy city name to input field
    ul.childNodes.forEach((li) => {
      li.addEventListener('click', (e) => {
        filter.value = li.innerText;
        storage.setLocationData(li.innerText);
        weather.changeLocation(li.innerText);

        getWeatherOnDomLoaded();
      });
    });
  });
}

// Type helper

filter.addEventListener('keyup', (typedCity) => {
  const inputText = typedCity.target.value.toLowerCase();

  ul.childNodes.forEach((li) => {
    const cityName = li.innerText;

    if (
      cityName.toLowerCase().indexOf(inputText) !== -1 &&
      typedCity.target.value !== '' &&
      filter.value.length > 1
    ) {
      li.style.display = 'block';
    } else {
      li.style.display = 'none';
    }
  });
});

document.querySelector('#choose-city').addEventListener('click', (e) => {
  fetching();
});

// Change location
document.getElementById('w-change-btn').addEventListener('click', (e) => {
  const city = document.getElementById('city').value;

  weather.changeLocation(city);

  getWeatherOnDomLoaded();
});

function getWeatherOnDomLoaded() {
  weather.getWeatherFromApi().then((result) => ui.paint(result));
}
