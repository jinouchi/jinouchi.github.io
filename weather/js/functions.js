/* *************************************
 *  Weather Site JavaScript Functions
 ************************************* */

// test/debug code
console.log('My javascript is being read.');

// Variables for Function Use
const temp = 31;
const speed = 5;
let direction = document.getElementById("dialDir").innerHTML; //set direction equal to value in HTML
let condition;
let conditionDescription = document.getElementById("Summary").innerHTML;
let feet;

if (direction.length < 4) {
	direction = direction.toUpperCase(); //make sure provided wind direction ("SE") is uppercase
	document.getElementById("dialDir").innerHTML = direction; //change provided wind direction to "direction" to ensure uppercase
}

console.log("Wind direction: " + direction); //print direction in cosole

//function calls
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
	console.log("Calculated windchill: " + wc);

	// Round the answer down to integer
	wc = Math.floor(wc);

	// If chill is greater than temp, return the temp
	wc = (wc > temp) ? temp : wc;

	// Display the windchill
	console.log("Floored windchill: " + wc);
	feelTemp.innerHTML = wc;
}

// Wind Dial Function
function windDial(direction) {
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
			result = "rain";
			break;

		case "fog":
		case "foggy":
			result = "fog";
			break;
	}

	console.log("getCondition has returned: " + result)
	return result;
}

function changeSummaryImage(condition) {

	//define variables
	let image;

	//logic precheck
	console.log("changeSummaryImage() has received input of " + condition);

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

	console.log("changeSummaryImage() returned " + image);

	//return
	if (image != "dummy") {
		const conditionImage = document.getElementById("conditionImage");
		const curWeather = document.getElementById("curWeather");
		curWeather.setAttribute("class", "background" + image);
		conditionImage.setAttribute("class", "summary" + image);
		return true; //a valid value was returned
	} else {
		return false; //and invalid value was returned
	}
}

function convertMeters(meters) {
	return (meters * 3.28084);
}