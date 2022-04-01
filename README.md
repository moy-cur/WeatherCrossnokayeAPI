![logo](https://static.wixstatic.com/media/ec3ca2_3fcbf6a06c11451d97a059edf9f111e5~mv2.png/v1/fill/w_265,h_36,al_c,usm_0.66_1.00_0.01,enc_auto/color%20logo.png)

# Weather API CrossnoKaye

### Author: Moises Salvador Curiel Salgado

This API is intended for serving hourly forecast for an specified zip code using the National Weather Service API.

## Instructions

To run:

```
npm install
npm start
```

To specify port:

Change the PORT variable in the .env file.

## Specifications

+ Built with NodeJS and ExpressJS `4.17.3`

+ Use of `express-validator` for middleware validations.

+ Use of `AXIOS` to retrieve the coordinates of the provided zip code.

+ Use of [MapBox](https://docs.mapbox.com/api/overview/) to get the coordinates for the provided zip code.

+ .env file added to repository in order to use the MapBox API with my personal key.

+ Use of dotenv to keep environment variables.

## Links

+ [Swagger definition](https://app.swaggerhub.com/apis-docs/moycur/WeatherCrossnokayeAPI/1.0.0#/forecast/get_forecast__zipCode__hourly)

+ [GitHub Repository](https://github.com/moy-cur/WeatherCrossnokayeAPI)