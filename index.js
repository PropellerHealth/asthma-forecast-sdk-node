/** @module asthma-forecast/client */
var request = require('request');
var async = require('async');
var _ = require('underscore');
var debug = require('debug');
var packageJson = require('./package.json');

module.exports = function(options) {


	var debug = function() {};
	if(process.env.DEBUG) {
	    try {
	        debug = require('debug')('asthma-forecast');
	    }
	    catch (e) {
	        console.log("Notice: 'debug' module is not available. This should be installed with `npm install debug` to enable debug messages", e);
	        debug = function() {};
	    }
	}

	var httpGet = function(uri, callback) {
		var params = {
			baseUrl : "https://mptyew8uk9.execute-api.us-west-2.amazonaws.com/prod/forecast",
			uri : uri,
			method : "GET",
			timeout : 60000,
			gzip : true,
			headers : {
				'User-Agent' : 'asthma-forecast@' + packageJson.version
			}
		};
		debug(params);

		// bake in a retry mechanism
		async.retry({ times: 5, interval: 500 }, function(done) {
			request.get(params, function(err, message, body) {
				if( err ) {
					debug('Propeller API call fail: ' + err);
				}
				debug('   err : ' + err);
				debug('status : ' + message.statusCode);
				done(err,{statusCode:message.statusCode,body:body});
			});
		}, function(err, results) {
			var parsed_results = JSON.parse(results.body);
			debug(results);
			if( err || results.statusCode > 200 ) {
				var err = !err ? parsed_results.message : err;
				callback(err,parsed_results);
			} else {
    			callback(err,parsed_results);
    		}
		});

	};
	
	return {
		
		/** callback for getForecastByZipCode
		* @callback module:asthma-forecast/client~getForecastByZipCodeCallback
		* @param {Object} [err] error calling Propeller API
		* @param {Object} [result] forecast
		*/
		/**
		* getForecastByZipCode
		* @param {String} options.zipCode Zip code
		* @param {module:asthma-forecast/client~getForecastByZipCodeCallback} [callback] callback
		*/
		getForecastByZipCode: function(zip, callback) {

			var queryString = "?postalCode="+zip;
			httpGet(queryString, function(err, results) {
				callback(err, results);
			});

		},

		/** callback for getForecastByLatLong
		* @callback module:asthma-forecast/client~getForecastByLatLongCallback
		* @param {Object} [err] error calling asthma-forecast
		* @param {Object} [result] forecast
		*/
		/**
		* getForecastByLatLong
		* @param {Number} latitude Latitude in decimal degrees
		* @param {Number} longitude longitude in decimal degrees
		* @param {module:asthma-forecast/client~getForecastByLatLongCallback} [callback] callback
		*/
		getForecastByLatLong: function(lat, lon, callback) {

			var queryString = "?latitude="+lat+"&longitude="+lon;
			httpGet(queryString, function(err, results) {
				callback(err, results);
			});

		}
			
	};
};