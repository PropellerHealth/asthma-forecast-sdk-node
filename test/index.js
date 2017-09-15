var asthma_forecast = require('../index.js')();

var validate_results = function(results) {
    console.assert(results.geometry,"Missing property, geometry");
    console.assert(results.geometry.coordinates,"Missing geometry coordinates");
    console.assert(results.geometry.type,"Missing geometry type");
    console.assert(results.geometry.coordinates.length===2,"Invalid geometry coordinate list"+results.geometry.coordinates);
    console.assert(results.properties,"Missing property, properties");
    console.assert(results.properties.code,"Missing properties code");
    console.assert(['low','medium','high'].indexOf(results.properties.code)>=0,"Invalid property code, "+results.properties.code);
    console.assert(results.properties.value,"Missing properties value");
    console.assert(results.type,"Missing results property, type");
}
// verify zipcode requests return valid results
asthma_forecast.getForecastByZipCode("53711", function(err,results) {
    console.log('TEST : Verify the results for a zipcode request');
    if(err) {
    	console.log('Bummer. The called failed :(  :: '+err);
    } else {
        validate_results(results);
	}
    console.log('... PASS');
});

// get the forecast by lat/lng for madison
asthma_forecast.getForecastByLatLong(43.13986,-89.3375, function(err,results) {
    console.log('TEST : Verify the results for a lat/lng request');
    if(err) {
    	console.log('Bummer. The called failed :(  :: '+err);
    } else {
        validate_results(results);
	}
	console.log('... PASS');
});
