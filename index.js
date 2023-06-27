const searchBTN = document.querySelector('.search-button');
const locationINPUT = document.querySelector('.location-input');
const convertDegreesINPUT = document.querySelector('.convert-degrees-input');
const locationNameH1 = document.querySelector('.location-name');
const tempTextH2 = document.querySelector('.temp');
const conditionTextH2 = document.querySelector('.condition');
const conditionIMG = document.querySelector('.weather-condition');

async function getWeather() {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=5e03bd42c86845dc90d143729232406&q=${locationINPUT.value}&aqi=no`,
      { mode: 'cors' }
    );
    const data = await response.json();

    const weatherData = {
      city: data.location.name,
      tempC: data.current.temp_c,
      tempF: data.current.temp_f,
      condition: data.current.condition.text,
      conditionIMG: data.current.condition.icon,
    };

    return weatherData;
  } catch (err) {
    console.log(err);
  }
}

function updateWeatherDisplay(weatherData) {
  locationNameH1.textContent = weatherData.city;
  conditionTextH2.textContent = weatherData.condition;
  conditionIMG.src = weatherData.conditionIMG;
  tempTextH2.innerHTML = weatherData.tempF + '&#176;F';
}

const convertToC = degreesC => (tempTextH2.innerHTML = degreesC + '&#176;C');

const convertToF = degreesF => (tempTextH2.innerHTML = degreesF + '&#176;F');

window.addEventListener('DOMContentLoaded', async () => {
  let weatherData = await getWeather();
  updateWeatherDisplay(weatherData);
});

searchBTN.addEventListener('click', async () => {
  let weatherData = await getWeather();
  updateWeatherDisplay(weatherData);

  locationINPUT.focus();
});

locationINPUT.addEventListener('keyup', async e => {
  if (e.keyCode === 13) {
    let weatherData = await getWeather();
    updateWeatherDisplay(weatherData);
    locationINPUT.focus();
  }
});

convertDegreesINPUT.addEventListener('click', async () => {
  let weatherData = await getWeather();
  let isDegreesF = convertDegreesINPUT.checked;

  isDegreesF ? convertToF(weatherData.tempF) : convertToC(weatherData.tempC);
});
