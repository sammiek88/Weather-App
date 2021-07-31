let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

// write your code here

let city = prompt("Enter a city");
city = city.toLowerCase();

if (weather[city] !== undefined) {
  let tempCelcius = Math.round(weather[city].temp);
  let humidity = weather[city].humidity;
  let tempFahrenheit = (tempCelcius * 9) / 5 + 32;

  alert(
    `It is currently ${tempCelcius}°C / ${tempFahrenheit}°F in ${city} with ${humidity}% humidity`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+sydney&oq=weather+${city}&aqs=chrome..69i57j35i39l2j69i60l5.2475j0j7&sourceid=chrome&ie=UTF-8 `
  );
}
