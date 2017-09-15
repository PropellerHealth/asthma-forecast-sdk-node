# asthma-forecast

A module for interfacing with Propeller Health's Asthma Forecasting service.

## Installation

npm install asthma-forecast

## Examples

```javascript
var forecast = require('asthma-forecast')();

// get the forecast by zip
forecast.getForecastByZipCode("53703", function(err, forecast) {
    console.dir(forecast);
});

// get the forecast by lat/lng
forecast.getForecastByLatLong(42.7434488,-88.5667269, function(err, forecast) {
    console.dir(forecast);
});
```
## Run tests

npm test
