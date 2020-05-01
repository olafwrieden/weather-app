# Simple Weather App
A basic Node.js weather app to fetch the temperature of any city in the world using the [OpenWeather](https://openweathermap.org/) API.

The source code is adapted from [this repo](https://github.com/bmorelli25/simple-nodejs-weather-app) for the purpose of creating and documenting a development environment around an existing project.

### Getting Started

1. Create a `.env` file in the root directory of this repo.
2. Copy the contents of the `.env.example` file into the previously created `.env` file. Then set the variables as required. Example: `PORT=3000`
3. Install all required dependencies by running: `npm install`

### In Development

Wouldn't it be nice if the page were to refresh for instant feedbacl whenever you have saved a code change? Well, that's where a package called `nodemon` comes in. In *development* , start the application using:

```javascript
$ npm run dev
// Now open your browser and visit: localhost:3000 (or port number defined in .env)
```

### In Production

Wouldn't it be nice if the page were to refresh for instant feedbacl whenever you have saved a code change? Well, that's where a package called `nodemon` comes in. In *development* , start the application using:

```javascript
$ npm start
// Now open your browser and visit: localhost:3000 (or port number defined in .env)
```