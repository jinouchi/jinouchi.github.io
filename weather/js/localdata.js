"use strict";

//declare initial variables
let pageNav = document.getElementById('page-nav');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('main-content');
let weatherURL = "/weather/js/weather.json";


//function calls
fetchData(weatherURL);

function fetchData(weatherURL){
  let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the greenville part
    // shorten the variable and focus only on the data we want to reduce typing
    let g = data[cityName];

    // ************ Get the content ******************************

    // Get the location data
    let locName = g.City;
    let locState = g.State;
    let zip = g.Zip;
    let elevation = g.Elevation;
    let latitude = g.Latitude;
    let longitude = g.Longitude;
    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked
    console.log('fullName is: '+fullName);


    // Get the temperature data
    let tempTemp = g.Temp;
    console.log("Returned tempTemp is: " + tempTemp);

    let tempHigh = g.High;
    console.log("Returned tempHigh is: " + tempHigh);

    let tempLow = g.Low;
    console.log("Returned tempLow is: " + tempLow);


    // Get the wind data 
    let windSpeed = g.Wind;
    console.log("Returned windSpeed is: " + windSpeed);

    let windDirection = g.Direction;
    if (windDirection.length < 4) {
      windDirection = windDirection.toUpperCase(); //make sure provided wind direction ("SE") is uppercase
      document.getElementById("dialDir").innerHTML = direction; //change provided wind direction to "direction" to ensure uppercase
    }
    console.log("Returned windDirection is: " + windDirection);

    let windGusts = g.Gusts;
    console.log("Returned windGusts is: " + windGusts);


    // Get the current conditions
    let curPrecip = g.Precip;
    console.log("Returned curPrecip is: " + curPrecip);

    let curSummary = g.Summary;
    console.log("Returned curSummary is: " + curSummary);


    // Get the hourly data 
    let hourlyData = g.Hourly;

    // ************ Display the content ******************************
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('pageTitle');
    console.log("Returned pageTitle is: " + pageTitle);
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    console.log("Returned fullNameNode is: " + fullNameNode);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    document.getElementById("elevationMeters").innerText = convertMeters(elevation);
    document.getElementById("latitude").innerText = latitude;
    document.getElementById("longitude").innerText = longitude;
    document.getElementById("zip").innerText = zip;

    // Get the h1 to display the city location
    let contentHeading = document.getElementById('contentHeading');
    contentHeading.innerHTML = fullName;
    // The h1 in main h1 should now say "Greenville, SC"


    // Set the temperature information
    document.getElementById('tempTemp').innerHTML = tempTemp;
    console.log(`id temp has been set to: ${tempTemp}`);
    document.getElementById('high').innerHTML = tempHigh;
    document.getElementById('low').innerHTML = tempLow;
    

    // Set the wind information
    document.getElementById('windSpeed2').innerText = windSpeed;
    document.getElementById('dialDir').innerText = windDirection;
    document.getElementById('windGusts').innerText = windGusts;
    windDial(windDirection);

    buildWC(windSpeed, tempTemp); //determine wind chill ("Feels like")

    // Set the current conditions information
    document.getElementById('Summary').innerText = curSummary;
    changeSummaryImage(getCondition(curSummary));

    // Set the hourly temperature information

    for (var i = 0; i < hourlyData.length; i++) { // loop for each item in array
      let offset = 18;                    // variable for manual offset to determine start time
      let hour = i + offset;              // hours don't start at zero
      let hourDisplay = hour + 1;         // Store hours in AM/PM
      let xm;                             // AM/PM variable

      while (hour >= 24)                  // rollover from 24 to 0
        hour -= 24;

      while (hourDisplay > 12)            // rollover from 13 to 1
        hourDisplay -= 12;                // convert to PM
        
      if (hour / 10.0 <= 1 || hour == 0 || hour == 23)                // determine if AM/PM
        xm = " AM: ";
      else 
        xm = " PM: ";

      // console.log("hour is: " + hour);                               // debug code
      // console.log("hourDisplay is: " + hourDisplay);                 // debug code

      document.getElementById("hourly-forecast-list").innerHTML += "<li>" + hourDisplay + xm + hourlyData[i] + "&deg;F |&nbsp;</li>";
    }

    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
}