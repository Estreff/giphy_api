$(function() {

var selectedTopic;
var topics = ['Val Kilmer', 'Kurt Russel', 'Tom Hanks', 'Kate Beckinsale'];
var newSelection;

	function createButton() {
		for (var i = 0; i < topics.length; i++) {
			var createTopicBtn = topics[i];
			var createBtn = $('<button>').addClass("btn btn-success");
			createBtn.text(createTopicBtn);
			$('#buttons').append(createBtn);
			console.log(createTopicBtn);
		}
	}

	createButton();

	function newTopic() {
		newSelection = $('#topicInput').val();
		console.log('New Topic: ', newSelection);
		topics.push(newSelection);
		console.log('New Topic Array: ', topics);
		var createBtn = $('<button>').addClass("btn btn-success");
		createBtn.html(newSelection);
		$('#buttons').append(createBtn);

		$('#topicInput').val("");
		
	}

// When 'Go' Button is selected, it adds new Topic into topics Array
	$('#addTopic').click(function() {
		newTopic()
	});

// When Enter is hit, it adds new Topic into topics Array


// Not Currently working

/*	$('#topicInput').keypress(function(e) {
		if(e.which == 13) {
			
			$('#addTopic').click()
		}
	});
*/

// Giphy Actors API Key Api Key: 65e85c3c72d046378ec61d27120944aa



var createGif;
var createIframe;


// Topic Button selected and will reach out to Giphy API
	$('.btn-success').click(function(event) {
			$('#gifs1').html("");
			$('#gifs2').html("");
			setTimeout(3000);
			var topicName = $(event.currentTarget).html();
			var gifNumber = 8;
			var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=65e85c3c72d046378ec61d27120944aa&q=' + topicName +'&limit=' + gifNumber + '&offset=0&rating=PG&lang=en';
			console.log(topicName);
			$('#gifsTitle').html(topicName).css('visibility', 'visible');
			console.log('Button Select Topic: ', topicName);
			$.ajax({
				url:queryURL,
				method: "GET"	
			}).done(function(response) {
				for (var j = 0; j < response.data.length/2; j++) {
					createGif = response.data[j].embed_url;
					createIframe = $('<iframe src="' + createGif + '" frameborder="0" scrolling="no"></iframe>');
					$('#gifs1').append(createIframe);
				}
				for (var k = response.data.length/2; k < response.data.length; k++) {
					createGif = response.data[k].embed_url;
					createIframe = $('<iframe src="' + createGif + '" frameborder="0" scrolling="no"></iframe>');
					$('#gifs2').append(createIframe);
				}
			})				
	});
});