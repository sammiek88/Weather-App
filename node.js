//change h1 to todays date
function date() {
  document.getElementById('today-day').innerHTML = `${utcDay}`;
}

function showweather(response) {
  document.querySelector('#city').innerHTML = response.data.name;
  let latestTemp = document.querySelector('#temp-celcuis');
  latestTemp.innerHTML = Math.round(response.data.main.temp);
  document.querySelector('#humidity').innerHTML = response.data.main.humidity;
  document.querySelector('#feelslike').innerHTML =
    response.data.main.feels_like;
  document.querySelector('#windspeed').innerHTML = response.data.wind.speed;
  document.querySelector('#description').innerHTML =
    response.data.weather[0].description;
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
let now = new Date();
let utcDay = now.toGMTString();
let temp = 18;

date();

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
//api weather data
//function displayWeather(response) {
// console.log(response);
//}

//function changeTemp(event) {
// event.preventDefault;
// let apiKey = 'e4078cf116e415a86a523b0d99dfe1fa';
//let city = TempCelcius.innerHTML;
//let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
// axios.get(apiUrl).then(displayWeather);
//}
