$(function() {

// Global Variables
	var topics = ['Val Kilmer', 'Kurt Russel', 'Tom Hanks', 'Kate Beckinsale', 'Tom Cruise', 'Cate Blanchett'];
	var newSelection;
	var gifNumber = 3;
	var gifNumberChanged;
	var gifMax = 25;

// Function to use the topics Array to create Buttons
	function createButton() {
		$('#buttons').html("")
		$('#qtyNeeded').attr('value', gifNumber);
		$('#qtyNeeded').attr('max', 25);

		for (var i = 0; i < topics.length; i++) {
			var createTopicBtn = topics[i];
			var createBtn = $('<button>').addClass("btn btn-success");
			createBtn.text(createTopicBtn);
			$('#buttons').append(createBtn);			
			console.log('Initial Button Created: ', createTopicBtn);
		}

		$('.btn-success').click(function() {
				topicButton(event);
			});		
	}
// Call Create Buttons to push to the website
	createButton();

// More Global Variables
	var createGif;
	var topicName = "";
	var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=65e85c3c72d046378ec61d27120944aa&q=' + topicName +'&limit=' + gifNumber + '&offset=0&rating=PG&lang=en';

// Giphy Actors API Key Api Key: 65e85c3c72d046378ec61d27120944aa
// Topic Button selected and will reach out to Giphy API
	function topicButton(event) {
			$('#gifs1').html("");
			$('#gifs2').html("");
			setTimeout(3000);
			topicName = $(event.currentTarget).html();
			console.log('Topic Name: ', topicName);
			$('#gifsTitle').html(topicName).css('visibility', 'visible');
			queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=65e85c3c72d046378ec61d27120944aa&q=' + topicName +'&limit=' + gifNumber + '&offset=0&rating=PG&lang=en';
			$.ajax({
				url:queryURL,
				method: "GET"	
			}).done(function(response) {
				console.log(response);	
				for (var j = 0; j < response.data.length/2; j++) {
					createGif = response.data[j].images.original_still.url;
					createImg = $(`<p class="caption"><img src="${createGif}" width="100%" data-still="${response.data[j].images.original_still.url}" data-animate="${response.data[j].images.original.url}"></img>Gif Rating: ${response.data[j].rating}</p>`)
				$('#gifs1').append(createImg);
				}
				for (var k = Math.round(response.data.length/2); k < response.data.length; k++) {
					createGif = response.data[k].images.original_still.url;
					createImg = $(`<p class="caption"><img src="${createGif}" width="100%" data-still="${response.data[k].images.original_still.url}" data-animate="${response.data[k].images.original.url}"></img>Gif Rating: ${response.data[k].rating}</p>`);
					$('#gifs2').append(createImg);
				}
			})
		}
var topicExists = false;
var updatedSelection = "";

// When a new topic is added this will add to array and create clickable button
	function newTopic() {
		newSelection = $('#topicInput').val();
		console.log('New Topic: ', newSelection);

				function titleCase(newSelection) {
					newSelection = newSelection.split(" ");
					console.log('Before For Loop: ', newSelection);
						for(var m = 0; m < newSelection.length; m++) {
							newSelection[m] = newSelection[m].charAt(0).toUpperCase() + newSelection[m].slice(1);
							console.log(newSelection[m]);
						}
					console.log('After For Loop: ', newSelection)
					updatedSelection = newSelection.join(" ");
					console.log('After Join: ', newSelection);
				}
				
				for(var l = 0; l < topics.length; l++) {
					if (newSelection.toLowerCase() == topics[l].toLowerCase()) {
						topicExists = true;
						console.log(topicExists);
						console.log(topics); }
				}
						

			if(newSelection == "") {
					alert('Please enter name!');
				} else if (topicExists === true) {
					alert('Topic Entered already exists, please make another entry!');
					$('#topicInput').val("");
					topicExists = false;
				} else {
					titleCase(newSelection);
					topics.push(updatedSelection);
					console.log('New Topic Array: ', topics);
					createButton();
					$('#gifsTitle').text(updatedSelection);
					$('#topicInput').val("");
				}
			}

// Selecting the quantity of Gif files to return 

	function selectQty() {	
		gifNumberChanged = $('#qtyNeeded').val();		
		
		if($('#qtyNeeded').val() == "" || $('#qtyNeeded').val() === 0) {
			alert('Enter Quantity');
			$('#qtyNeeded').val("");
		} else if (gifNumberChanged <= gifMax) {
			$('#qtyNeeded').attr('value', gifNumberChanged);	
			gifNumber = gifNumberChanged;		
		} else {
			alert(`Please select a number less than or equal to ${gifMax}`);
			$('#qtyNeeded').val("");
		}
	}

  // Reloads ajax call to update the quantity of gif files that are displayed
	 // and Displays New topic when created!

		function qtyReload() {
			$('#gifs1').html("");
			$('#gifs2').html("");
			reloadTopicName = $('#gifsTitle').text();
			console.log(reloadTopicName);
			reloadGifNumber = $('#qtyNeeded').attr('value');

			if(reloadTopicName != "") {
				$('#gifsTitle').html(reloadTopicName).css('visibility', 'visible');
			} else {
				$('#gifsTitle').html(reloadTopicName).css('visibility', 'hidden');
			}

			console.log('Reload Topic: ', reloadTopicName);
			console.log('Reload Gif Number', reloadGifNumber);
			var reloadQueryURL = 'https://api.giphy.com/v1/gifs/search?api_key=65e85c3c72d046378ec61d27120944aa&q=' + reloadTopicName +'&limit=' + reloadGifNumber + '&offset=0&rating=PG&lang=en';
			$.ajax({
				url:reloadQueryURL,
				method: "GET"	
			}).done(function(reloadResponse) {
				console.log(reloadResponse);	
				for (var j = 0; j < reloadResponse.data.length/2; j++) {
					createGif = reloadResponse.data[j].images.original_still.url;
					createImg = $(`<p class="caption"><img src="${createGif}" width="100%" data-still="${reloadResponse.data[j].images.original_still.url}" data-animate="${reloadResponse.data[j].images.original.url}"></img>Gif Rating: ${reloadResponse.data[j].rating}</p>`);					
					$('#gifs1').append(createImg);
				}
				for (var k = Math.round(reloadResponse.data.length/2); k < reloadResponse.data.length; k++) {
					createGif = reloadResponse.data[k].images.original_still.url;
					createImg = $(`<p class="caption"><img src="${createGif}" width="100%" data-still="${reloadResponse.data[k].images.original_still.url}" data-animate="${reloadResponse.data[k].images.original.url}"></img>Gif Rating: ${reloadResponse.data[k].rating}</p>`);
					$('#gifs2').append(createImg);
				}
			})
		}

// Button and Enter Selection for changing Quantities!!! 

// When 'Submit' Button is selected, it submits qty for use with API query
	$('#addQty').click(function() {
		selectQty();
		qtyReload();
	});

// When Enter is hit on Quantity Select, it submits qty for use with API query
	$('#qtyNeeded').keypress(function(f) {
		if(f.which === 13) {
			selectQty();
			qtyReload();			
		}
	});

// Button and Enter Selection for Adding Topics!!!

// When 'Add Topic!' Button is selected, it adds new Topic into topics Array
	$('#addTopic').click(function() {
		newTopic();
		qtyReload();		
	});

// When Enter is hit on Topic Button, it adds new Topic into topics Array

	$('#topicInput').keypress(function(e) {
		if(e.which == 13) {
			newTopic();
			qtyReload();
		}
	});
						
	
// Switched the img src from 'Still' to 'Animated' after loaded
	$('.gifCatalog').click(function(event) {
		var gifSelected =  $(event.target);
		var gifSelectedSRC = $(event.target).attr('src');
		console.log('Gif selected: ', gifSelectedSRC);
		var still =  $(event.target).attr('data-still');
		var animate =  $(event.target).attr('data-animate');
		
		if (gifSelectedSRC === still) {
			gifSelected.attr('src', animate);
			console.log('Gif executed: ', animate)
		} else {
			gifSelected.attr('src', still);
			console.log('Gif executed: ', still)
		}
			
	});

});