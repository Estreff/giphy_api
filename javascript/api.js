$(function() {

// Global Variables
var topics = ['Val Kilmer', 'Kurt Russel', 'Tom Hanks', 'Kate Beckinsale', 'Tom Cruise', 'Cate Blanchett'];
var newSelection;
var gifNumber = 3;

// Function to use the topics Array to create Buttons
	function createButton() {
		$('#buttons').html("")
		$('#qtyNeeded').attr('placeholder', gifNumber);

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

// When a new topic is added this will add to array and create clickable button
	function newTopic() {
		newSelection = $('#topicInput').val();
		console.log('New Topic: ', newSelection);
		if(newSelection === '') {
			alert('Please enter name!');
		} else {
			topics.push(newSelection);
			console.log('New Topic Array: ', topics);
			createButton();
			$('#topicInput').val("");
		}	
	}

// When 'Add Topic!' Button is selected, it adds new Topic into topics Array
	$('#addTopic').click(function() {
		newTopic()
	});

// When Enter is hit on Topic Button, it adds new Topic into topics Array

	$('#topicInput').keypress(function(e) {
		if(e.which == 13) {
			newTopic()
		}
	});

// Selecting the quantity of Gif files to return 

	function selectQty() {
		console.log('Qty Start: ', gifNumber)	
		gifNumber = $('#qtyNeeded').val();
		if($('#qtyNeeded').val() === "") {
			alert('Enter Quantity');
		} else {
			console.log('New Quantity: ', gifNumber);
			$('#qtyNeeded').val("");
			$('#qtyNeeded').attr('placeholder', gifNumber);
					
		}
	}

// When 'Submit' Button is selected, it submits qty for use with API query
	$('#addQty').click(function() {
		selectQty();
	});

// When Enter is hit on Quantity Select, it submits qty for use with API query
	$('#addQty').keypress(function(f) {
		if(f.wvhich == 13) {
			alert('Enter Quantity Selected');
			selectQty()
		}
	});


// Giphy Actors API Key Api Key: 65e85c3c72d046378ec61d27120944aa

var createGif;
var createIframe;
var topicName;

// Topic Button selected and will reach out to Giphy API
	function topicButton(event) {
			$('#gifs1').html("");
			$('#gifs2').html("");
			setTimeout(3000);
			topicName = $(event.currentTarget).html();
			console.log('Topic Name: ', topicName);
			$('#gifsTitle').html(topicName).css('visibility', 'visible');
	
			var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=65e85c3c72d046378ec61d27120944aa&q=' + topicName +'&limit=' + gifNumber + '&offset=0&rating=PG&lang=en';
			$.ajax({
				url:queryURL,
				method: "GET"	
			}).done(function(response) {
				console.log(response);	
				for (var j = 0; j < response.data.length/2; j++) {
					createGif = response.data[j].images.original_still.url;
					createImg = $(`<img src="${createGif}" width="100%" data-still="${response.data[j].images.original_still.url}" data-animate="${response.data[j].images.original.url}"></img>`);
					$('#gifs1').append(createImg);
				}
				for (var k = Math.round(response.data.length/2); k < response.data.length; k++) {
					createGif = response.data[k].images.original_still.url;
					createImg = $(`<img src="${createGif}" width="100%" data-still="${response.data[k].images.original_still.url}" data-animate="${response.data[k].images.original.url}"></img>`);
					$('#gifs2').append(createImg);
				}
			})

							
	};

			$('#gifGroup').click(function(event) {
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