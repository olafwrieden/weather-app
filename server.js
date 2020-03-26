require("dotenv-safe").config();
const request = require("request");
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");

// Create Express App
const app = express();

// Add Middleware
app.use(helmet());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Destructure ENVs
const { API_KEY, NODE_ENV, PORT } = process.env;

// Define a Weather Object
const weather = {
  weather: null,
  error: null,
  icon: null
};

/**
 * Reset the Weather Object.
 */
const clearWeather = () => {
  weather.weather = null;
  weather.error = null;
  weather.icon = null;
};

/**
 * Query the OpenWeather API to return a given city's weather information.
 * @param {String} city city for which to return weather information
 */
const getWeather = city => {
  return new Promise((resolve, reject) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    // Fetch and Return Data
    request(url, (err, _, body) => {
      const weatherData = JSON.parse(body);
      if (err) {
        console.log(err)
        reject(JSON.stringify(err));
      } else if (
        !weatherData.name ||
        !weatherData.main.temp ||
        !weatherData.weather[0].icon
      ) {
        resolve(JSON.stringify("Data error, please try again."));
      } else {
        resolve(body);
      }
    });
  });
};

// API Routes

app.get("/", (_, res) => {
  res.render("index", weather);
});

app.post("/", async (req, res) => {
  const city = req.body.city;
  console.log(`${Date.now()} - ${city} - weather requested`);

  // Query Weather API
  getWeather(city)
    .then(data => {
      const weatherResponse = JSON.parse(data);

      // Return Weather Data
      if (NODE_ENV === "production") {
        weather.weather = `It's ${weatherResponse.main.temp} degrees in ${city}.`;
        weather.icon = weatherResponse.weather[0].icon;
        weather.error = null;

        // Render Information & Reset
        res.status(200).render("index", weather);
      } else {
        res.status(200).send(weatherResponse);
      }
    })
    .catch(err => {
      let errMsg = JSON.stringify(err);
      console.log(`${Date.now()} - ${city} - error: ${errMsg}`);

      // Return Error Message
      if (NODE_ENV === "production") {
        weather.error = "Error, please try again.";
        res.status(200).render("index", weather);
      } else {
        res.status(400).send(errMsg);
      }
    })
    .finally(() => {
      // Reset Weather Object
      clearWeather();
    });
});

// Start Server
var server = app.listen(PORT, () => {
  console.log("--------------------------");
  console.log(`Weather App: on port ${PORT}!`);
  console.log("--------------------------");
});

module.exports = { getWeather, server };
