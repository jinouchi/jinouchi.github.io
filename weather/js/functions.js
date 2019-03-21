/* *************************************
 *  Weather Site JavaScript Functions
 ************************************* */

console.log('My javascript is being read.'); // test/debug code

// Declare Variables
		   //this definition provided for franklin only
let temp = document.getElementById("tempTemp").innerText;
// console.log("temp has been set to :" + temp);

			//this definition provided for franklin only
let speed = document.getElementById("windSpeed2").innerText;
// console.log("speed has been set to :" + speed);

				//this definition provided for franklin only
let direction = document.getElementById("dialDir").innerHTML.toUpperCase(); //set direction equal to value in HTML

let condition = "clear";
let conditionDescription = document.getElementById("Summary").innerHTML;
let feet;
let pageTitle = document.getElementById("pageTitle");
let storage = window.localStorage;                // Local storage shortcut

// Set global variable for custom header required by NWS API
var idHeader = {
	headers: {
	  "User-Agent": "Student Learning Project - wil16082@byui.edu"
	}
  };

// console.log("Wind direction: '" + direction + "'"); //print direction in cosole

 //make sure provided wind direction ("SE") is uppercase
document.getElementById("dialDir").innerHTML = document.getElementById("dialDir").innerHTML.toUpperCase();

//franklin function calls go here 
windDial(direction); //rotate wind dial
//buildWC(speed, temp); //determine wind chill ("Feels like")
condition = getCondition(conditionDescription); //return starndardized condition from a variety of descriptions
//changeSummaryImage(condition);

getHourly(storage.getItem("hourlyURL"));

//elevation logic - convert meters to feet
document.getElementById("elevationMeters").innerHTML = convertMeters(document.getElementById("elevationMeters").innerHTML);

// Calculate the Windchill
function buildWC(speed, temp) {
	// Compute the windchill
	let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
	console.log("Calculated windchill: '" + wc + "'");

	// Round the answer down to integer
	wc = Math.floor(wc);

	// If chill is greater than temp, return the temp
	wc = (wc > temp) ? temp : wc;

	// Display the windchill
	console.log("Floored windchill: '" + wc + "'");
	// feelTemp.innerHTML = wc;
	return wc;
}

// Wind Dial Function - Rotate image according to wind direction.
function windDial(direction) {

	// pre-debug
	console.log("windDial has received input of '" + direction + "'");
	// Get the wind dial container
	const dial = document.getElementById("dial");

	// Determine the dial class
	switch (direction) {
		case "North":
		case "N":
			dial.setAttribute("class", "n"); //"n" is the CSS rule selector
			break;
		case "NE":
		case "NNE":
		case "ENE":
			dial.setAttribute("class", "ne");
			break;
		case "NW":
		case "NNW":
		case "WNW":
			dial.setAttribute("class", "nw");
			break;
		case "South":
		case "S":
			dial.setAttribute("class", "s");
			break;
		case "SE":
		case "SSE":
		case "ESE":
			dial.setAttribute("class", "se");
			break;
		case "SW":
		case "SSW":
		case "WSW":
			dial.setAttribute("class", "sw");
			break;
		case "East":
		case "E":
			dial.setAttribute("class", "e");
			break;
		case "West":
		case "W":
			dial.setAttribute("class", "w");
			break;
	}
}

/* Begin Image stuff */

function getCondition(conditionDescription) {

	//define variables
	let result;

	//logic pre-check
	console.count("getCondition() recieved input of '" + conditionDescription + "'");

	switch (conditionDescription.toLowerCase()) {
		case "partly cloudy":
		case "cloudy":
			result = "clouds";
			break;

		case "snow":
		case "snowy":
			result = "snow";
			break;

		case "clear":
		case "clear skies":
			result = "clear";
			break;

		case "rain":
		case "rainy":
		case "wet":
		case "wet weather":
		case "thunderstorm":
		case "thunderstorms":
		case "stormy":
			result = "rain";
			break;

		case "fog":
		case "foggy":
			result = "fog";
			break;
	}

	console.log("getCondition() has returned: '" + result + "'")
	return result;
}

function changeSummaryImage(condition) {

	//define variables
	let image;

	//logic precheck
	console.log("changeSummaryImage() has received input of '" + condition + "'");

	//logic
	switch (condition) {
		case "clear":
			image = "clear";
			break;

		case "rain":
			image = "rain";
			break;

		case "snow":
			image = "snow";
			break;

		case "fog":
			image = "fog";
			break;

		case "clouds":
			image = "clouds";
			break;

		default:
			image = "dummy";
	}

	console.log("changeSummaryImage() returned '" + image + "'");

	//return
	if (image != "dummy") {
		const conditionImage = document.getElementById("conditionImage");
		const curWeather = document.getElementById("curWeather");
		curWeather.setAttribute("class", "background" + image);
		conditionImage.setAttribute("class", "summary" + image);
		conditionImage.setAttribute("alt", "Picture of " + image);
		console.log("changeSummaryImage() returned a valid value.");
		return true; //a valid value was returned
	} else {
		console.log("changeSummaryImage() returned an invalid value.");
		return false; //and invalid value was returned
	}
}

function convertMeters(meters) {
	return (meters * 3.28084);
}

// Convert, Format time to 12 hour format
function format_time(hour) {
	if (hour > 23) {
		hour -= 24;
	}
	let amPM = (hour > 11) ? "pm" : "am";
	if (hour > 12) {
		hour -= 12;
	}
	if (hour == 0) {
		hour = "12";
	}
	return hour + amPM;
}

// Build the hourly temperature list
function buildHourlyData(nextHour,hourlyTemps) {
	// Data comes from a JavaScript object of hourly temp name - value pairs
	// Next hour should have a value between 0-23
	// The hourlyTemps variable holds an array of temperatures
	// Line 8 builds a list item showing the time for the next hour 
	// and then the first element (value in index 0) from the hourly temps array
	 let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F</li>';
	 // Build the remaining list items using a for loop
	 for (let i = 1, x = hourlyTemps.length; i < x; i++) {
	  hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F</li>';
	 }
	 console.log('HourlyList is: ' +hourlyListItems);
	 return hourlyListItems;
	}

// Get the next hour based on the current time (what is this for?)
let date = new Date(); 
let nextHour = date.getHours() + 1;



/* ***** BEGIN NEW LOCATION STUFF ***** */
getLocation(storage.getItem("locale"));
// Gets location information from the NWS API
function getLocation(locale) {
	const URL = "https://api.weather.gov/points/" + locale; 
	console.log('getLocation() URL: ' + URL);
	// NWS User-Agent header (built above) will be the second parameter 
	fetch(URL, idHeader) 
	.then(function(response){
	  if(response.ok){ 
	   return response.json(); 
	  } 
	  throw new ERROR('Response not OK.');
	})
	.then(function (data) { 
	  // Let's see what we got back
	  console.log('Json object from getLocation function:'); 
	  console.log(data);
		// Store data to localstorage 
		console.log(data.properties.relativeLocation.properties.city);
		console.log(data.properties.relativeLocation.properties.state);
	  storage.setItem("locName", data.properties.relativeLocation.properties.city); 
	  storage.setItem("locState", data.properties.relativeLocation.properties.state); 
		
	  // Next, get the weather station ID before requesting current conditions 
	  // URL for station list is in the data object 
	  let stationsURL = data.properties.observationStations; 
	  storage.setItem("hourlyURL", data.properties.forecastHourly);
	  storage.setItem("forecastURL", data.properties.forecast);
	//   console.log("hourlyURL is: " + hourlyURL);

	  // Call the function to get the list of weather stations
	  getStationId(stationsURL); 
	 }) 
	.catch(error => console.log('There was a getLocation error: ', error)) 
	 } // end getLocation function
	 

	 // Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
	// NWS User-Agent header (built above) will be the second parameter 
	fetch(stationsURL, idHeader) 
	.then(function(response){
		if(response.ok){ 
		 return response.json(); 
		} 
		throw new ERROR('Response not OK.');
	})
	.then(function (data) { 
		// Let's see what we got back
		console.log('From getStationId() function:'); 
		console.log(data);
	
		// Store station ID and elevation (in meters - will need to be converted to feet) 
		let stationId = data.features[0].properties.stationIdentifier; 
		let stationElevation = data.features[0].properties.elevation.value; 
		console.log('Station and Elevation are: ' + stationId, stationElevation); 
 
		// Store data to localstorage 
		storage.setItem("stationId", stationId); 
		storage.setItem("stationElevation", stationElevation); 
 
		// Request the Current Weather for this station 
		getWeather(stationId);
	 }) 
	.catch(error => console.log('There was a getStationId error: ', error)) 
 } // end getStationId function


 // Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
	// This is the URL for current observation data 
	const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
	// NWS User-Agent header (built above) will be the second parameter 
	fetch(URL, idHeader) 
	.then(function(response){
		if(response.ok){ 
		 return response.json(); 
		} 
		throw new ERROR('Response not OK.');
	})
	.then(function (data) { 
		// Let's see what we got back
		console.log('From getWeather function:'); 
		console.log(data);
	
		// Store weather information to localStorage 
		// Elevation:
		storage.setItem("elevation", data.properties.elevation.value);
		storage.setItem("elevationUnit", data.properties.elevation.unitCode);

		// Temperature:
		storage.setItem("tempCurrent", Math.round(convertToDegF(data.properties.temperature.value)));
		
		// Wind Chill:
		storage.setItem("windChill", data.properties.windChill.value);
		storage.setItem("windChillUnit", data.properties.windChill.unitCode);
		
		// Wind Speed
		storage.setItem("windSpeed", Math.round(data.properties.windSpeed.value));
		storage.setItem("windSpeedUnit", data.properties.windSpeed.unitCode);
		// If wind speed is undefined or null, display 0 instead:
		if (document.getElementById("windSpeed2").innerText == "undefined" || document.getElementById("windSpeed2").innerText == "null")
			document.getElementById("windSpeed2").innerText = 0;

		// Description (Clear/Rain/Cloudy/Snow/etc.)
		storage.setItem("description", data.properties.textDescription);
 
		// Get image
		let icon = data.properties.icon;
		let iconSize = 400;
		storage.setItem("icon", icon.substring(0, icon.length - 6) + iconSize);
		console.log("icon: " + storage.getItem("icon"));
		
		// Build the page for viewing 
		
	 }) 
	.catch(error => console.log('There was a getWeather error: ', error)) 


	 // second fetch
	 fetch(storage.getItem("forecastURL"), idHeader) 
	.then(function(response){
		if(response.ok){ 
		 return response.json(); 
		} 
		throw new ERROR('getWeather() response 2 not OK.');
	})
	.then(function (data2) { 
		// Let's see what we got back
		console.log("getWeather() forecastURL object: ");
		console.log(data2);
		if(data2.properties.periods[0].temperature > data2.properties.periods[1].temperature)
		{
			storage.setItem("tempHigh", data2.properties.periods[0].temperature);
			storage.setItem("tempLow", data2.properties.periods[1].temperature);
		}
		else
		{
			storage.setItem("tempHigh", data2.properties.periods[1].temperature);
			storage.setItem("tempLow", data2.properties.periods[0].temperature);
		}

		// Wind Direction: 
		storage.setItem("windDirection", data2.properties.periods[0].windDirection); // N/S/E/W value

		// Wind Gusts: 
		storage.setItem("windGusts", data2.properties.periods[0].windGusts);
		if (document.getElementById("windGusts").innerText == "undefined")
			document.getElementById("windGusts").innerText = 0;

	}) 
	.catch(error => console.log('There was a getWeather() error: ', + error))
 } // end getWeather function


 function getHourly(hourlyURL)		
 {
	fetch(hourlyURL, idHeader) 
	.then(function(response){
		if(response.ok){ 
		 return response.json(); 
		} 
		throw new ERROR('getHourly() response not OK.');
	})
	.then(function (data) { 
		// Let's see what we got back
		console.log('From getHourly function:'); 
		console.log(data);

		for (var x = 0; x < 13; x++)		// Store first 13 hours of temps
		{
			//console.log("Loop " + x);
			storage.setItem("hour" + x, data.properties.periods[x].temperature)
			console.log("local storage hour" + x + ": " + storage.getItem("hour" + x));
		}
	}) 
	.catch(error => console.log('There was a getHourly error: ', + error)) 
}

buildPage();
function buildPage()		
{
	// 1) calculate wind chill & inject temperatures
	let wc = buildWC(storage.getItem("windSpeed"), storage.getItem("tempCurrent"));
	console.log("wc: " + wc);

	if (wc == "NaN")
		document.getElementById("feelsTemp").innerText = storage.getItem("tempCurrent");
	else
		document.getElementById("feelsTemp").innerText = wc;
	
	document.getElementById("tempTemp").innerText = storage.getItem("tempCurrent");
	document.getElementById("high").innerText = storage.getItem("tempHigh");
	document.getElementById("low").innerText = storage.getItem("tempLow");

	// 2) Set wind stuff
	document.getElementById("dialDir").innerText = storage.getItem("windDirection");
	document.getElementById("windSpeed2").innerText = storage.getItem("windSpeed");
	document.getElementById("windGusts").innerText = storage.getItem("windGusts");
	
	// 3) send in the phrase to determine which weather background image should be shown
	let summary = changeSummaryImage(storage.getItem("description"));
	// NOTE: NWS IMAGES ARE AVAILABLE IN HOURLY DATA (PERIODS)
	
	// 4) convert the elevation from meters to feet
	let feet = convertMeters(storage.getItem("elevation"));
	
	// 5) build the hourly temps area of the current location page
	let hourlyTemps = "";

	for (let i = 0; i < 13; i++) {
		hourlyTemps += '<li>' + format_time(nextHour+i) + ': ' + storage.getItem("hour" + i) + '&deg;F |&nbsp;</li>';
	   }
	   console.log('hourlyTemps List is: ' + hourlyTemps);

	document.getElementById("hourly-forecast-list").innerHTML = hourlyTemps;

	// 6) inject location info (City, State, Coordinates, Elevation, Zip) ** ZIP  is not necessary. If you want to do it, you can use google maps API, "reverse geocoding"
	document.getElementById("city").innerText = storage.getItem("locName");
	document.getElementById("stateID").innerText = storage.getItem("locState");
	document.getElementById("elevationMeters").innerText = Math.round(feet);
	document.getElementById("latitude").innerText = storage.getItem("lat");	
	document.getElementById("longitude").innerText = storage.getItem("long");

	// Inject summary
	document.getElementById("Summary").innerText = storage.getItem("description");
	document.getElementById("conditionImage").innerHTML = "<img src=" + storage.getItem("icon") + "></img>";

	// background image
	document.getElementById("curWeather").style = "background-image: url(" + storage.getItem("icon") + "); background-repeat: no-repeat; background-size: cover;";
	// hide "status" and show <main>
	document.getElementById("status").className = 'hide';
	document.getElementById("main-content").className = '';
}


function convertToDegF(celsius)
{
	f = (celsius * 1.8) +32;
	return f;
}