// Array of subjects to start off with

var topics = ["happy", "crying", "angry", "disgusted"];

// Loop that creates buttons from the array above

function renderButtons() {

	$("#buttons-view").empty();

	for (var i = 0; i < topics.length; i++) {

		var a = $("<button>");

		a.addClass("gif-button");

		a.attr("data-name", topics[i]);

		a.text(topics[i]);

		$("#buttons-view").append(a);
	}
}

$(document).ready(function () {

	renderButtons();

});

// Click function that makes the AJAX call run and the gifs appear

$(document).on("click", ".gif-button", displayGifs);

function displayGifs () {

// AJAX call to the Giphy API

$("#gif-view").empty();

var button = $(this).attr("data-name");
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + button + "&api_key=dc6zaTOxFJmzC&limit=10";

$.ajax({
	url: queryURL,
	method: 'GET'
}).done(function(response) {

	console.log(response);


    	// Displays 10 gifs, create divs for the gifs and adds ratings

    	var results = response.data;

    	for (var i = 0; i < results.length; i++) {


    		var emotionDiv = $("<div>");

    		var p = $("<p>").text("Rating: " + results[i].rating);

    		var emotionImage = $("<img>");

    		emotionImage.addClass("gif");

    		emotionImage.attr("src", results[i].images.fixed_height_still.url);

    		emotionDiv.append(p);
    		emotionDiv.append(emotionImage);

    		$("#gif-view").prepend(emotionDiv);

    	// Adds data attributes to make the gifs pauseable later

    		emotionImage.attr("data-state", "still");
    		emotionImage.attr("data-animate", results[i].images.fixed_height.url);
    		emotionImage.attr("data-still", results[i].images.fixed_height_still.url);

    }

});

};

// Make the gifs pause-able

$(document).on("click", ".gif", pauseGifs);

function pauseGifs () {

	var state = $(this).attr("data-state");

	if (state === "still") {

		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");

	} else {

		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");

	}

};

// Have submissions create a button 