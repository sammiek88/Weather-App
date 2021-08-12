//change h1 to todays date
function date(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `${minutes}`;
  }
  let daysweek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = date.getDay(daysweek);
  return `${daysweek[day]} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  return days[day];
}

function formathour(timestamp) {
  let hour = new Date(timestamp * 1000);
  let hours = hour.getHours();
  let timeHour = [
    '1 AM',
    '2AM',
    '3AM',
    '4AM',
    '5AM',
    '6AM',
    '7AM',
    '8AM',
    '9AM',
    '10AM',
    '11AM',
    '12PM',
    '1PM',
    '2PM',
    '3PM',
    '4PM',
    '5PM',
    '6PM',
    '7PM',
    '8PM',
    '9PM',
    '10PM',
    '11PM',
    '12AM',
  ];
  return timeHour[hours];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector('#forecast');

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="day">${formatDay(forecastDay.dt)}</div>
          <div class="iconForecast">
            <img
            src = "https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt="" />
          </div>
          <div><span>${Math.round(forecastDay.temp.max)}</span> °C</div> 
          <div><span>${Math.round(forecastDay.temp.min)}</span> °C</div> 
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  dailyForecast(response);
}

function dailyForecast(response) {
  console.log(response.data.hourly);

  let hourforecast = response.data.hourly;
  let hourforecastElement = document.querySelector('#dailyforecast');

  let hourforecastHTML = `<div class="row">`;
  hourforecast.forEach(function (forecastDay, index) {
    if (index < 3) {
      hourforecastHTML =
        hourforecastHTML +
        `<div class="col-4">
                  <div class="card dailyforecast">
                    <div class="dailyForecast" id="dailyforecast">
                       <div class="time">${formathour(forecastDay.dt)}</div>
                      <img
            src = "https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt="" />
                      
                    </div>
                  </div>
                  <div><span>${Math.round(forecastDay.temp)}</span> °C</div> 
          
          </div>`;
    }
  });
  hourforecastHTML = hourforecastHTML + `</div>`;
  hourforecastElement.innerHTML = hourforecastHTML;
}

function getForecast(coordinates) {
  let apiKey = 'e4078cf116e415a86a523b0d99dfe1fa';
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showweather(response) {
  document.querySelector('#city').innerHTML = response.data.name;
  let latestTemp = document.querySelector('#temp-celcuis');
  latestTemp.innerHTML = Math.round(response.data.main.temp);
  let dateElement = document.getElementById('today-day');
  let iconElement = document.querySelector('#icon');
  let iconImage = response.data.weather[0].icon;
  TempCelcius = response.data.main.temp;

  if (latestTemp.innerHTML > 17) {
    document.querySelector('#brolly').innerHTML = `Its a warm day!😎`;
  } else {
    document.querySelector('#brolly').innerHTML = `Don't forget your coat!🧥`;
  }
  document.querySelector('#humidity').innerHTML = response.data.main.humidity;
  document.querySelector('#feelslike').innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector('#windspeed').innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector('#description').innerHTML =
    response.data.weather[0].description;
  iconElement.setAttribute(
    'src',
    `https://openweathermap.org/img/wn/${iconImage}@2x.png`
  );
  iconElement.setAttribute('alt', response.data.weather[0].description);

  dateElement.innerHTML = date(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function searchcity(city) {
  let apiKey = 'e4078cf116e415a86a523b0d99dfe1fa';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showweather);
}

function formEntry(event) {
  event.preventDefault();
  let city = document.querySelector('#exampleDataList').value;
  searchcity(city);
}

function searchlocation(position) {
  //position.coords.latitude,
  // position.coords.longitude;
  let apiKey = 'e4078cf116e415a86a523b0d99dfe1fa';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showweather);
}

//getcurrentlocation weather
function getcurrentlocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(searchlocation);
}

//convert back to celcius
function celsiusunits(event) {
  event.preventDefault();
  TempFarenheit.classList.add('active');
  CelciusLink.classList.remove('active');

  let temperatureElement = document.getElementById('temp-celcuis');
  temperatureElement.innerHTML = Math.round(TempCelcius);
}

//convert temp to fahrenheit

function farenheitunits(event) {
  event.preventDefault();
  CelciusLink.classList.add('active');
  TempFarenheit.classList.remove('active');
  let farenheit = Math.round(TempCelcius * 9) / 5 + 32;
  let celciusTemp = document.getElementById('temp-celcuis');
  celciusTemp.innerHTML = Math.round(farenheit);
}

//convert back to celcius
function celsiusunits(event) {
  event.preventDefault();
  CelciusLink.classList.remove('active');

  let temperatureElement = document.getElementById('temp-celcuis');
  temperatureElement.innerHTML = Math.round(TempCelcius);
}

let TempCelcius = null;

let form = document.querySelector('form');
form.addEventListener('submit', formEntry);

let TempFarenheit = document.getElementById('farenheit-temp');
TempFarenheit.addEventListener('click', farenheitunits);

let CelciusLink = document.getElementById('celius-unit');
CelciusLink.addEventListener('click', celsiusunits);

//Currentlocation
let currentLocationbutton = document.querySelector('#currentlocation');
currentLocationbutton.addEventListener('click', getcurrentlocation);

//default of Manchester
searchcity('Manchester');
displayForecast();
//function changeTemp(event) {
// event.preventDefault;
// let apiKey = 'e4078cf116e415a86a523b0d99dfe1fa';
//let city = TempCelcius.innerHTML;
//let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
// axios.get(apiUrl).then(displayWeather);
//}
