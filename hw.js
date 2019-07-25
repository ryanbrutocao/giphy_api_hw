
gifArr = ["turtle","dog", "cat", "fish", "horse", "marmot", "bird", "lizzard"]
var btn;



function renderBtns(){
  $("#gifRow").empty();
  btn;
for (var i=0; i<gifArr.length; i++){
  
  var btn = $("<button>");
  btn.addClass("btn btn-info");

  btn.attr("data-name",gifArr[i]);
  btn.text(gifArr[i]);
  $("#gifRow").append(btn)

}
}


$("#submitBtn").on("click", function(event){
  event.preventDefault();
  
  var newGif = $("#gifInput").val().trim()
  gifArr.push(newGif);
  $("#gifInput").val('')
  renderBtns()
})

var animal = $(".btn-info").attr("data-name");
console.log(animal);
$(this).on("click", function() {
  // Grabbing and storing the data-animal property value from the button
  console.log(queryURL);

  // Constructing a queryURL using the animal name
  var queryURL = "https://api.gify.com/v1/gifs/search?q=" +
  animal + "&api_key=cEwbXDdhkHifC3t4ZkD4tR3l4KaVLQsH&limit=10";
  console.log(response);

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var animalDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var animalImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        animalImage.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and image tag to the animalDiv
        animalDiv.append(p);
        animalDiv.append(animalImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(animalDiv);
      }
    });
});
renderBtns();

