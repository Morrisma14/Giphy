// $(document).ready(function(){
  // array for first buttons
  var topics = ["Emma Stone", "Zac Efron", "Jennifer Aniston", "Drew Barrymore", "Channing Tatum", "Madelaine Petsch", "Ryan Reynolds", "Reese Witherspoom", "Will Smith", "Nicole Kidman", "Jonah Hill", "Jennier Lawrance"];


  
  function createButtons(){
    $("#actor-buttons").empty();

    for (var i = 0; i < topics.length; i++) {
      var button = $("<button>");
      button.addClass("actor");
      button.attr("data-name", topics[i]);
      button.text(topics[i]);
      $("#actor-buttons").append(button);
      
    }
  };



  $("#add-actor").click(function(){
    event.preventDefault();
    var actorTyped = $("#actor-input").val().trim();
    topics.push(actorTyped);
   createButtons();
  });

  function displayGIFS() {
    var selected = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selected + "&limit=10&api_key=uAuIz5hDabWCbxhRPnfm3YF0KL13pTu3";
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      console.log(response);
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        i
        var imageURL = results[i].images.fixed_height.url;
       
        var fixedStill = results[i].images.fixed_height_still.url;
      
        var imageDiv = $("<span class='imageDiv'>")
        var actorImage = $("<img class='gif'>");
        var rating = $("<p>").text("Rating: " + results[i].rating);
          actorImage.attr("src", fixedStill);
          actorImage.attr("data-state", "still");
          actorImage.attr("data-still", fixedStill);
          actorImage.attr("data-animate", imageURL)
        
          imageDiv.prepend(rating);
          imageDiv.append(actorImage);
          $("#actor-gifs").append(imageDiv);

      };
      $("img.gif").click(function(){
          var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });


    })
    $("#actor-gifs").empty();

  }
createButtons(); 
  $("#actor-buttons").on("click", "button.actor", displayGIFS);
  
  
  
  


// })