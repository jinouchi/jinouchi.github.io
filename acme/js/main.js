var urlJSON = "/acme/js/acme.json"
var debug = true;

// Function Calls:
buildNav();

// Function Definitions:
function buildNav() {
	let navContent;

	// Build home button
	navContent = "<ul class=\"navUL\"><li><button onclick=\"navigate(\'Home\')\">Home</button></li>";
	//console.log(navContent);

	// Build Anvils, Explosives, Decoys and Traps from JSON
	// fetch JSON
	fetch(urlJSON)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			}
			throw new ERROR('Response not OK.');
		})
		.then(function (data) { //store fetched data as object 'data'
			// Let's see what we got back
			if (debug) console.log('Json object from buildNav() function:');
			if (debug) console.log(data); //display fetched data

			let key = Object.keys(data);

			for (x = 0; x < key.length; x++) // use loop to populate nav bar
			{
				navContent += "<li><button onclick=\"navigate(\'" + key[x] + "\')\">" + key[x] + "</button></li>";
				 if (debug) console.log("Loop output: " + key[x]);
			}

			// test code
			// navContent += "<li><button onclick=\"navigate('Anvils')\">Click me</button></li>";
			navContent += "</ul>";

			if (debug) console.log("navContent = " + navContent);
			document.getElementById("nav").innerHTML = navContent;

		})
		.catch(error => console.log('There was a buildNav() error: ', error))
}


function navigate(input) {
	if (debug) console.log("navigate() has received: " + input);

	// Replace class of all articles with 'hide'. Use classList.add("class"); to add a class
	// document.getElementById("home").setAttribute("class", "hide");
	// document.getElementById("anvils").setAttribute("class", "hide");
	// document.getElementById("explosives").setAttribute("class", "hide");
	// document.getElementById("decoys").setAttribute("class", "hide");
	// document.getElementById("traps").setAttribute("class", "hide");

	if (input == "Home") // if home is clicked, show home and hide content
	{
		document.getElementById("home").setAttribute("class", "show");
		document.getElementById("content").setAttribute("class", "hide");
		document.getElementById("pageTitle").innerText = "ACME, Inc."
	} else // else, hide home and get/show content...
	{
		URL = "acme.json";
		fetch(urlJSON)
			.then(function (response) {
				if (response.ok) {
					return response.json();
				}
				throw new ERROR('Response not OK.');
			})
			.then(function (data) {
				// Let's see what we got back
				if (debug) console.log('Json object from navigate() function:');
				if (debug) console.log(data);

				let key = Object.keys(data);

				for (x = 0; x < key.length; x++)
				{
					if (key[x] == input)
					{
						let productTitle = Object.keys(data)[x];
						if (debug) console.log("productTitle = " + productTitle);

						let productPicture = data[input]["path"];
						if (debug) console.log("productPicture = " + productPicture);
						
						let productDescription = data[input]["description"];
						if (debug) console.log("productDescription = " + productDescription);						
						
						let pruductManufacturer = data[input]["manufacturer"];
						if (debug) console.log("pruductManufacturer = " + pruductManufacturer);
						
						let productReviews = data[input]["reviews"];
						if (debug) console.log("productReviews = " + productReviews);
						
						let productPrice = data[input]["price"];
						if (debug) console.log("productPrice = " + productPrice);

						// inject
						document.getElementById("productTitle").innerText = productTitle;
						document.getElementById("productPicture").innerHTML = "<img src=\"" + productPicture + "\" id=\"productPictureImg\">";
						document.getElementById("productDescription").innerText = productDescription;
						document.getElementById("pruductManufacturer").innerText = pruductManufacturer;
						document.getElementById("productReviews").innerText = productReviews + "\/5 stars";
						document.getElementById("productPrice").innerText = productPrice;
						document.getElementById("pageTitle").innerText = productTitle + " | ACME, Inc."
					}
				}
			})
			.catch(error => console.log('There was a navigation() error: ', error))

		// hide home and show content
		document.getElementById("home").setAttribute("class", "hide");
		document.getElementById("content").setAttribute("class", "content");
	}

}