
gifArr = ["Notorious BIG", "Tupac", "Eminem", "Jay-Z", "Public Enemy", "Outkast", "Beastie Boys", "Snoop Dog"]
var btn;



function renderBtns(){
  $("#gifRow").empty();
  btn;
for (var i=0; i<gifArr.length; i++){
  
  var btn = $("<button>");
  btn.addClass("btn btn-info");
  btn.attr("data-artist",gifArr[i])

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


$("#gifRow").on("click", ".btn", function() {
  $("displayGifs").empty();
  // Grabbing and storing the data-animal property value from the button
  var artist = $(this).attr("data-artist");
console.log(artist);
  
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cEwbXDdhkHifC3t4ZkD4tR3l4KaVLQsH&q=" + artist + "&limit=10&offset=0&rating=G&lang=en";
// console.log(queryURL);

$.ajax({
  url: queryURL,
  method: "GET"
}) .then(function(response) {

// console.log(queryURL);
console.log(response);
result =  response.data
console.log(result);
for (var i=0; i<result.length; i++){
//  var gifDiv = $("<div>")
//   var p = $("<p>");
  var gif = $("<img>")
  gif.attr("src", result[i].images.fixed_width_still.url)
  gif.attr("data-state", "still") 
  gif.attr("data-still", result[i].images.fixed_width_still.url)
  gif.attr("data-animate", result[i].images.fixed_width.url )
  gif.addClass("gif")
 // gifDiv.append(p);
  // gifDiv.append(gif)
  $("#displayGifs").prepend(gif)
}
// might need to be on its own below here...//
})


$("#displayGifs").on("click", ".gif", function() {
var state = $(this).attr("data-state");
if (state=== "still") {
  $(this).attr("src", $(this).attr("data-animate"));
  $(this).attr("data-state", "animate");
} else {
  $(this).attr("src", $(this).attr("data-still"));
  $(this).attr("data-state", "still");
}
});

});


renderBtns();

