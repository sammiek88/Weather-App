//change h1 to todays date
function date(timestamp) {
  console.log();
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = date.getDay();
  return `${daysweek[day]} ${hours}:${minutes}`;
}

function showweather(response) {
  console.log(response);
  document.querySelector('#city').innerHTML = response.data.name;
  let latestTemp = document.querySelector('#temp-celcuis');
  latestTemp.innerHTML = Math.round(response.data.main.temp);
  let dateElement = document.getElementById('today-day');

  if (latestTemp.innerHTML > 17) {
    document.querySelector('#brolly').innerHTML = `Its a warm day!😎`;
  } else {
    document.querySelector('#brolly').innerHTML = `Don't forget your coat!🧥`;
  }
  document.querySelector('#humidity').innerHTML = response.data.main.humidity;
  document.querySelector('#feelslike').innerHTML =
    response.data.main.feels_like;
  document.querySelector('#windspeed').innerHTML = response.data.wind.speed;
  document.querySelector('#description').innerHTML =
    response.data.weather[0].description;
  dateElement.innerHTML = date(response.data.dt * 1000);
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

//convert temp to fahrenheit
function farenheitunits(event) {
  event.preventDefault();
  let temp = 18;
  let farenheit = Math.round(temp * 9) / 5 + 32;
  let celciusTemp = document.getElementById('temp-celcuis');
  celciusTemp.innerHTML = farenheit;
}
//convert temp to celcius
function convertCelcius(event) {
  event.preventDefault();
  let TempCelcius = document.getElementById('temp-celcuis');
  TempCelcius.innerHTML = temp;
}

let form = document.querySelector('form');

form.addEventListener('submit', formEntry);

let TempFarenheit = document.getElementById('farenheit-temp');
TempFarenheit.addEventListener('click', farenheitunits);

let TempCelcius = document.getElementById('temp-celcuis');
TempCelcius.addEventListener('click', convertCelcius);

//Currentlocation
let currentLocationbutton = document.querySelector('#currentlocation');
currentLocationbutton.addEventListener('click', getcurrentlocation);

//default of Manchester
searchcity('Manchester');

//function changeTemp(event) {
// event.preventDefault;
// let apiKey = 'e4078cf116e415a86a523b0d99dfe1fa';
//let city = TempCelcius.innerHTML;
//let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
// axios.get(apiUrl).then(displayWeather);
//}
