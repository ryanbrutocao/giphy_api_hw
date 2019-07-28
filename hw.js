
topics = ["Notorious BIG", "Tupac", "Eminem", "Jay-Z", "Public Enemy", "Outkast", "Beastie Boys", "Snoop Dog"]
var btn;



function renderBtns(){
  $("#gifRow").empty();
  btn;
for (var i=0; i<topics.length; i++){
  
  var btn = $("<button>");
  btn.addClass("btn btn-info");
  btn.attr("data-artist",topics[i])

  btn.text(topics[i]);
  $("#gifRow").append(btn)

}
}

$("#submitBtn").on("click", function(event){
  event.preventDefault();
  
  var newGif = $("#gifInput").val().trim()
  topics.push(newGif);
  $("#gifInput").val('')
  renderBtns()
})



$("#gifRow").on("click", ".btn", function() {
  $("#displayGifs").empty();
  // Grabbing and storing the data-animal property value from the button
  var artist = $(this).attr("data-artist");
console.log(artist);
  
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cEwbXDdhkHifC3t4ZkD4tR3l4KaVLQsH&q=" + artist + "&limit=10&offset=0&lang=en";
// console.log(queryURL);
$.ajax({
  url: queryURL,
  // Rating: rating,
  method: "GET"
}) .then(function(response) {

// console.log(queryURL);
console.log(response);
result =  response.data
rating;
console.log(result);
for (var i=0; i<result.length; i++){
var gif = $("<img>");
gif.attr("src", result[i].images.fixed_width_still.url)
gif.attr("data-fav", "false")
gif.attr("data-state", "still");
gif.attr("data-still", result[i].images.fixed_width_still.url)
gif.attr("data-animate", result[i].images.fixed_width.url )
gif.addClass("gif")
var rating = $("<span class='rating'>").text('Rated: ' + result[i].rating.toUpperCase());
var favorites = $("<button class='favorites' type='submit'>").text('Favorites + / -');
favorites.attr("data-fav", "false")
var container = $("<container>")
container.addClass("gifContainer")
container.append(gif, rating, favorites )
  $("#displayGifs").prepend(container)
  
  
  
$("#displayGifs").on("click", ".favorites", function() {
  var state = $(this).attr("data-fav");
  if (state=== "false"  ) {
  
    $(this).attr("data-fav", "remove");
    $("#favoriteGifs").append(container)
  
  }
});
  
  $("#favoriteGifs").on("click", ".favorites", function() {
    var state = $(this).attr("data-fav");
    if (state=== "remove") {
      $(this).attr("data-fav", "false");
      $("#displayGifs").append(container)
      }
    });
  }
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
$("#favoriteGifs").on("click", ".gif", function() {
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

