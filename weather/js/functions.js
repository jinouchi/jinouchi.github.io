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

// console.log("Wind direction: '" + direction + "'"); //print direction in cosole

 //make sure provided wind direction ("SE") is uppercase
document.getElementById("dialDir").innerHTML = document.getElementById("dialDir").innerHTML.toUpperCase();

//franklin function calls go here 
windDial(direction); //rotate wind dial
buildWC(speed, temp); //determine wind chill ("Feels like")
condition = getCondition(conditionDescription); //return starndardized condition from a variety of descriptions
changeSummaryImage(condition);

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
	feelTemp.innerHTML = wc;
}

// Wind Dial Function
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