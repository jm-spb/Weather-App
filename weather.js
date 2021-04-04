class Weather {
  constructor(city) {
    this.city = city;
    this.apiKey = '56badea4d42290fe4ab37adc595796cb';
  }
  // Fetch weather from API
  async getWeatherFromApi() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric&lang=ru`
    );
    const responseData = await response.json();
    return responseData;
  }
  // Change weather location
  changeLocation(city) {
    this.city = city;
  }
}
