class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.temp = document.getElementById('w-temp');
    this.icon = document.getElementById('w-icon');
    this.details = document.getElementById('w-details');
    this.humidity = document.getElementById('w-humidity');
    this.pressure = document.getElementById('w-pressure');
    this.feelsLike = document.getElementById('w-feels-like');
    this.wind = document.getElementById('w-wind');
    this.sunrise = document.getElementById('w-sunrise');
    this.sunset = document.getElementById('w-sunset');
  }

  paint(weather) {
    this.location.textContent = weather.name;
    this.desc.textContent = weather.weather[0].description;
    this.temp.innerHTML = `<h1 class="display-3">${weather.main.temp.toFixed(
      1
    )}&#8451</h1>`;
    this.feelsLike.innerHTML = `<h5>По ощущению: ${weather.main.feels_like.toFixed(
      0
    )}&#8451</h5>`;
    this.icon.setAttribute(
      'src',
      `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    );
    this.humidity.textContent = `Влажность: ${weather.main.humidity}%`;
    this.pressure.textContent = `Давление: ${
      weather.main.pressure * 0.75
    } мм.рт.ст.`;

    this.wind.textContent = `Скорость ветра: ${weather.wind.speed} м/с`;

    // Convert sunrise  and sunset time (in unix format) to local time
    const sunriseHours = new Date(weather.sys.sunrise * 1000).getHours();
    const sunriseMinutes = new Date(weather.sys.sunrise * 1000).getMinutes();
    this.sunrise.textContent = `Восход солнца: ${sunriseHours}:${sunriseMinutes}`;
    const sunsetHours = new Date(weather.sys.sunset * 1000).getHours();
    const sunsetMinutes = new Date(weather.sys.sunset * 1000).getMinutes();
    this.sunset.textContent = `Заход солнца: ${sunsetHours}:${sunsetMinutes}`;
  }

  static showAlert() {
    const checkInput = document.querySelector('.check-input');
    checkInput.innerHTML = ` 
    <input type="text" class="form-control is-invalid" id="city">
    <div class="invalid-feedback">Пожалуйста, правильно введите город</div>
    `;
  }
}
