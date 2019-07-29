
topics = ["Notorious BIG", "Tupac", "Eminem", "Jay-Z", "Public Enemy", "Outkast", "Beastie Boys", "Snoop Dog"]
var btn;


// function to make buttons- takes strings from array and turns them into buttons
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
// submit button allows user to add new topics to the array
$("#submitBtn").on("click", function(event){
  event.preventDefault();
  
  var newGif = $("#gifInput").val().trim()
  topics.push(newGif);
  $("#gifInput").val('')
  renderBtns()
})

var container;
// function to allow user to click a button. makes an ajax call to the giphy API and loads 10 gifs onto the screen.
$("#gifRow").on("click", ".btn", function() {
  $("#displayGifs").empty();
  // Grabbing and storing the data-animal property value from the button
  var artist = $(this).attr("data-artist");
console.log(artist);
  
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cEwbXDdhkHifC3t4ZkD4tR3l4KaVLQsH&q=" + artist + "&limit=10&offset=0&lang=en";
// console.log(queryURL);
$.ajax({
  url: queryURL,
  method: "GET"
}) .then(function(response) {

// console.log(queryURL);
console.log(response);
result =  response.data
rating;
console.log(result);

for (var i=0; i<result.length; i++){
var gif = $("<img>");
var id = result[i].id
console.log(id);
gif.attr("src", result[i].images.fixed_width_still.url)
gif.attr("data-fav", "false")
gif.attr("data-state", "still");
gif.attr("data-still", result[i].images.fixed_width_still.url)
gif.attr("data-animate", result[i].images.fixed_width.url )
gif.addClass("gif")
var rating = $("<span class='rating'>").text('Rated: ' + result[i].rating.toUpperCase());
var favorites = $("<button class='favorites' type='submit'>").text('Favorites + / -');
favorites.attr("data-fav", "false")
favorites.attr("data-id", id)
var container = $("<container>")
container.addClass("gifContainer")
container.append(gif, rating, favorites )
  $("#displayGifs").prepend(container)
  
// allows the user to change the state of a gif which then shows onto a 'favorites' section of the screen while simultaneously removing it from the main gif area
$("#displayGifs").on("click", ".favorites", function() {
 
  var state = $(this).attr("data-fav");
  var dataID = $(this).attr(id)
  if (state=== "false") {
  
    $("#favoriteGifs").append(container, "data-fav", dataID)
    $(this).attr("data-fav", "true");
  
  }
});
  // allows user to remove gif from favorites section and add it back to the main gif area
  $("#submitNew").on("click", ".favorites", function() {
    
    var state = $(this).attr("data-fav");
    if (state=== "true") {
      $(this).attr("data-fav", "false");
      $("#displayGifs").append(container)
      }
    });
  }
})

// allows the user to click an 'add more' button which appends 10 new gifs to the main gif area without refreshing the screen.
var num = 10
$(".adding").on("click","#addMore", function(){
  console.log("first num: ", num);
  gifNum = num;
  offset = num + gifNum;
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cEwbXDdhkHifC3t4ZkD4tR3l4KaVLQsH&q=" + artist + "&limit=10&offset=" + offset + "&lang=en";
  
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }) .then(function(response) {
    num += 10
    console.log("second num: ", num);
//  newGifNum += 10;
 console.log(queryURL);
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
   $("#displayGifs").append(container)
 }})
 });

   // function that allows the user to click a still gif and turn it on or off
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
// allows the on/off feature in the 'favorites' section
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

