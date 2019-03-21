// 'use strict';

// // Set global variable for custom header required by NWS API
// var idHeader = {
// 	headers: {
// 	  "User-Agent": "Student Learning Project - wil16082@byui.edu"
// 	}
//   };

// let storage = window.localStorage;

// Call the function to get our location
getGeoLocation();

// Gets longitude and latitude of current location
function getGeoLocation() {
	const status = document.getElementById('status');
	status.innerHTML = 'Getting Location...';
	if (navigator.geolocation) {										//browser supports geolocation API
		navigator.geolocation.getCurrentPosition(function (position) {	//use API's gCP method to save position to 'position'
		 const lat = position.coords.latitude;							//save latitude to 'lat'
		 const long = position.coords.longitude;						//save longitude to 'long'
	  
		 storage.setItem("lat", (Math.round(lat * 100000) / 100000));	//round latitude to 5 decimal places
		 storage.setItem("long", (Math.round(long * 100000) / 100000));	//round longitude to 5 decimal places
		 
		 // Combine the values
		 const locale = lat + "," + long;								//convert to string & save to 'locale'
		 storage.setItem("locale", locale);
		 console.log(`Lat and Long are: ${locale}.`);					//debug statement
	     // Call getLocation function, send locale
		 getLocation(locale);	  
		})
	   } else {
		status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
	   } // end else
} // end getGeoLocation


// // Gets location information from the NWS API
// function getLocation(locale) {
// 	const URL = "https://api.weather.gov/points/" + locale; 
// 	console.log('getLocation() URL: ' + URL);
// 	// NWS User-Agent header (built above) will be the second parameter 
// 	fetch(URL, idHeader) 
// 	.then(function(response){
// 	  if(response.ok){ 
// 	   return response.json(); 
// 	  } 
// 	  throw new ERROR('Response not OK.');
// 	})
// 	.then(function (data) { 
// 	  // Let's see what we got back
// 	  console.log('Json object from getLocation function:'); 
// 	  console.log(data);
// 		// Store data to localstorage 
// 		console.log(data.properties.relativeLocation.properties.city);
// 		console.log(data.properties.relativeLocation.properties.state);
// 	  storage.setItem("locName", data.properties.relativeLocation.properties.city); 
// 	  storage.setItem("locState", data.properties.relativeLocation.properties.state); 
		
// 	  // Next, get the weather station ID before requesting current conditions 
// 	  // URL for station list is in the data object 
// 	  let stationsURL = data.properties.observationStations; 
// 	  // Call the function to get the list of weather stations
// 	  getStationId(stationsURL); 
// 	 }) 
// 	.catch(error => console.log('There was a getLocation error: ', error)) 
// 	 } // end getLocation function
	 

// 	 // Gets weather station list and the nearest weather station ID from the NWS API
// function getStationId(stationsURL) { 
// 	// NWS User-Agent header (built above) will be the second parameter 
// 	fetch(stationsURL, idHeader) 
// 	.then(function(response){
// 		if(response.ok){ 
// 		 return response.json(); 
// 		} 
// 		throw new ERROR('Response not OK.');
// 	})
// 	.then(function (data) { 
// 		// Let's see what we got back
// 		console.log('From getStationId function:'); 
// 		console.log(data);
	
// 		// Store station ID and elevation (in meters - will need to be converted to feet) 
// 		let stationId = data.features[0].properties.stationIdentifier; 
// 		let stationElevation = data.features[0].properties.elevation.value; 
// 		console.log('Station and Elevation are: ' + stationId, stationElevation); 
 
// 		// Store data to localstorage 
// 		storage.setItem("stationId", stationId); 
// 		storage.setItem("stationElevation", stationElevation); 
 
// 		// Request the Current Weather for this station 
// 		getWeather(stationId);
// 	 }) 
// 	.catch(error => console.log('There was a getStationId error: ', error)) 
//  } // end getStationId function


//  // Gets current weather information for a specific weather station from the NWS API
// function getWeather(stationId) { 
// 	// This is the URL for current observation data 
// 	const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
// 	// NWS User-Agent header (built above) will be the second parameter 
// 	fetch(URL, idHeader) 
// 	.then(function(response){
// 		if(response.ok){ 
// 		 return response.json(); 
// 		} 
// 		throw new ERROR('Response not OK.');
// 	})
// 	.then(function (data) { 
// 		// Let's see what we got back
// 		console.log('From getWeather function:'); 
// 		console.log(data);
	
// 		// Store weather information to localStorage 
// 		// Elevation:
// 		storage.setItem("elevation", data.properties.elevation.value);
// 		storage.setItem("elevationUnit", data.properties.elevation.unitCode);

// 		// Temperature:
// 		storage.setItem("tempCurrent", data.properties.temperature.value);
// 		storage.setItem("tempHigh", data.properties.maxTemperatureLast24Hours);
// 		storage.setItem("tempLow", data.properties.minTemperatureLast24Hours);

// 		// Wind Chill:
// 		storage.setItem("windChill", data.properties.windChill.value);
// 		storage.setItem("windChillUnit", data.properties.windChill.unitCode);

// 		// Wind Direction:
// 		storage.setItem("windDirection", data.properties.windDirection.value);  // value in degrees

// 		// Wind Gusts:
// 		storage.setItem("windGusts", data.properties.windGust.value);
		
// 		// Wind Speed
// 		storage.setItem("windSpeed", data.properties.windSpeed.value);
// 		storage.setItem("windSpeedUnit", data.properties.windSpeed.unitCode);
 
// 		// Build the page for viewing 
		
// 	 }) 
// 	.catch(error => console.log('There was a getWeather error: ', error)) 
//  } // end getWeather function