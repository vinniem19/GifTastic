
// My array of Holidays
let topic = ["Christmas", "Easter", "4th of July", "New Year"];
console.log(topic);

// This is where my gifs will change to animate or still; these two click listeners replace
// the for loop that we had in the still gif activity.
$(document).on("click", ".still-gif", function () {
  $(this).siblings(".active-gif").show();
  $(this).hide();
})

$(document).on("click", ".active-gif", function () {
  $(this).siblings(".still-gif").show();
  $(this).hide();
})
      
    // When user clicks submit, the button is added (using the renderButtons function below) 
      $("#add-holiday").on("click", function (event) {
      event.preventDefault();
  // This line of code will grab the input from the textbox
      let holidayInput = $("#holiday-input").val().trim();
        $("#holidays-input").empty();
        // The holiday from the user input is then added to our array
      topic.push(holidayInput);
      
      renderButtons();
      });

    // This will be my function that displays the data after push of specific button
         function displayGiphy(topic) {
      
      // This stores the query url as a variable
            let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Fpy46RCZ5r7l1RWFL71kJzbyOTffX7Ig&q=" + topic + "&limit=10&rating=pg";
      
      //  This is the ajax call method to get the information from the Giphy api
             $.ajax({
             url: queryURL,
             method: "GET"
            }).then(function(response) { // This defines the function to get the data as a response
            
            let results = response.data;
            console.log(results);
            // I am looping through the data and prepending images of the different holidays
            for (let i = 0; i < results.length; i++) {
                let gifDiv = $("<div>");
                let rating = results[i].rating;
                let para = $("<p>").text("Rating: " + rating);
                let gifImage1 = $("<img>");
                gifImage1.addClass("active-gif");
                let imageUrl = results[i].images.fixed_height.url;
                gifImage1.attr("src", imageUrl);
                let gifImage2 = $("<img>");
                gifImage2.addClass("still-gif");
                let imageUrl2 = results[i].images.fixed_height_still.url; //check location
                gifImage2.attr("src", imageUrl2);
                
                
                gifDiv.prepend(para).append(gifImage1).append(gifImage2);
                
                // Here we put the div with the holiday image, p, and rating before the images already created. 
                $("#holiday-view").prepend(gifDiv);
            };
        });
     };
    // Function for making the buttons appear in the html and as part of the topic array (working-movie-app)

function renderButtons() {

    // Deletes the new holiday buttons
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of movies
    for (let i = 0; i < topic.length; i++) {

      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      let holidayButtonAdd = $("<button>");
      // Adds a class of movie to our button
      holidayButtonAdd.addClass("holiday");
      // Added a data-attribute
      holidayButtonAdd.attr("data-name", topic[i]);
      // Provided the initial button text
      holidayButtonAdd.text(topic[i]);
      // Added the button to the buttons-view div
      $("#buttons-view").append(holidayButtonAdd);
    }
  }
  renderButtons();
  
    // I will need an onclick function to hold all this data until the click
    $(document).on("click", ".holiday", function() {
      displayGiphy($(this).attr("data-name"));

    });
    
    
    