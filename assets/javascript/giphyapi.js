
// My array of Holidays
var topic = ["Christmas", "Easter", "4th of July", "New Year"];
console.log(topic);

// This stores the query url as a variable

var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Fpy46RCZ5r7l1RWFL71kJzbyOTffX7Ig&q=christmas&limit=10&rating=pg";

// Putting this array into buttons on a page
// This will create the onClick event listener to make the holiday button clickable

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

        let p = $("<p>").text("Rating: " + rating);

        let holidayImage = $("<img>");
        var imageUrl = response.data.image_original_url;

        // This variable will hold the html image element
        // This creates the source attribute for the holiday image var and provide alt text tag
        holidayImage.attr("src", imageUrl);
        holidayImage.attr("alt", "holiday image");
        

        gifDiv.prepend(p);
        gifDiv.prepend(holidayImage);

        // Here we put the div with the holiday image, p, and rating before the images already created. 
        $("#holiday-view").prepend(gifDiv);
      }
      

        
        

    
      });

  

         