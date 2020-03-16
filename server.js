require('dotenv-safe').config();
const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const apiKey = process.env.API_KEY;
const weather = {
  weather: null,
  error: null,
  icon: null
};

let timestamp;

const requestWeather = city => {
  return new Promise((resolve, reject) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, (err, response, body) => {
      const weatherResponse = JSON.parse(body);

      if (err) {
        let errMsg = JSON.stringify(err);
        weather.error = "Error, please try again.";
        console.log(`${timestamp} - ${city} - error: ${errMsg}`);
        resolve();
      } else if (!weatherResponse.name || !weatherResponse.main.temp) {
        weather.error = "Error, please try again.";
        console.log(`${timestamp} - ${city} - unexpected api output: ${body}`);
        resolve();
      } else {
        weather.weather = `It's ${weatherResponse.main.temp} degrees in ${city}.`;
        weather.error = null;
        weather.icon = weatherResponse.weather[0].icon;
        console.log(`${timestamp} - ${city} - ${body}`);
        resolve();
      }
    });
  });
};

const clearWeather = () => {
  weather.weather = null;
  weather.error = null;
  weather.icon = null;
};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", weather);
});

app.post("/", (req, res) => {
  const city = req.body.city;
  timestamp = Date.now();
  console.log(`${timestamp} - ${city} - weather requested`);
  requestWeather(city).then(() => {
    res.render("index", weather);
    clearWeather();
  });
});

app.listen(process.env.PORT, () => {
  console.log('--------------------------');
  console.log(`Weather App: on port ${process.env.PORT}!`);
  console.log('--------------------------');
});
