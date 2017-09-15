var asthma_forecast = require('../index.js')();

// get the forecast by zip for madison
asthma_forecast.getForecastByZipCode("53711", function(err,results) {
    console.log('-----------------------------------');
    console.log('Get the forecast by zip for Madison, WI');
    if(err) {
    	console.log('Bummer. The called failed :(  :: '+err);
    } else {
	    console.log('  translated the zip to point, ' + results.geometry.coordinates);
	    console.log('    code : ' + results.properties.code);
	    console.log('   value : ' + results.properties.value);
	}
    console.log('\n');
});

// get the forecast by lat/lng for madison
asthma_forecast.getForecastByLatLong(43.13986,-89.3375, function(err,results) {
    console.log('-----------------------------------');
    console.log('Get the forecast by lat/lng for Madison, WI');
    if(err) {
    	console.log('Bummer. The called failed :(  :: '+err);
    } else {
	    console.log('    code : ' + results.properties.code);
	    console.log('   value : ' + results.properties.value);
	}
	console.log('\n');
});
