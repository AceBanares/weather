const forecast = [];


function init() {
  fetch("https://api.jsonbin.io/b/5d408e9d35e3f814032d0e0b")
    .then(promise => promise.json())
    .then(data => getForecast(data));
}

function getForecast(weather) {
  console.log(weather);
  const { summary, temperature, icon } = weather.currently;
  forecast.push({
    summary,
    temperature,
    icon
  });
  weather.daily.data.forEach(day => {
    const { summary, temperatureHigh, temperatureLow, time, icon } = day;
    forecast.push({
      summary,
      temperatureHigh,
      temperatureLow,
      day: unixToDayName(time),
      icon
    });
  });
  console.log(forecast);
  displayData(forecast);
}

init();

function unixToDayName(unix) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[new Date(unix * 1000).getDay() - 1];
}

function displayData(forecast) {

  temp1hi.innerHTML = `High: ${forecast[1].temperatureHigh}&deg;`
  temp1lo.innerHTML = `Low: ${forecast[1].temperatureLow}&deg;`;
  temp2hi.innerHTML = `High: ${forecast[2].temperatureHigh}&deg;`
  temp2lo.innerHTML = `Low: ${forecast[2].temperatureLow}&deg;`;
  temp3hi.innerHTML = `High: ${forecast[3].temperatureHigh}&deg;`
  temp3lo.innerHTML = `Low: ${forecast[3].temperatureLow}&deg;`;
  temp4hi.innerHTML = `High: ${forecast[4].temperatureHigh}&deg;`
  temp4lo.innerHTML = `Low: ${forecast[4].temperatureLow}&deg;`;

  day1.textContent = forecast[1].day;
  day2.textContent = forecast[2].day;
  day3.textContent = forecast[3].day;
  day4.textContent = forecast[4].day;
  
  summary1.textContent = forecast[1].summary;
  summary2.textContent = forecast[2].summary;
  summary3.textContent = forecast[3].summary;
  summary4.textContent = forecast[4].summary;

  const skycons = new Skycons({"color": "pink"});
  // on Android, a nasty hack is needed: {"resizeClear": true}

  // // you can add a canvas by it's ID...
  // skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY;

  // // ...or by the canvas DOM element itself.
  // skycons.add(document.getElementById("icon2"), Skycons.RAIN);
  
  // if you're using the Forecast API, you can also supply
  // strings: "partly-cloudy-day" or "rain".
  skycons.add(icon1, forecast[1].icon);
  skycons.add(icon2, forecast[2].icon);
  skycons.add(icon3, forecast[3].icon);
  skycons.add(icon4, forecast[4].icon);

  // start animation!
  skycons.play();

  // you can also halt animation with skycons.pause()

  // // want to change the icon? no problem:
  // skycons.set("icon1", Skycons.PARTLY_CLOUDY_NIGHT);

  // // want to remove one altogether? no problem:
  // skycons.remove("icon2");
}