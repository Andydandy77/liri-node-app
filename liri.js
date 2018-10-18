
// Initializes all the required packages
var request = require("request")
 require("dotenv").config();
 var Spotify = require('node-spotify-api');

var keys = require("./keys.js")
var spotify = new Spotify(keys.spotify);
var fs = require("fs");




var nodeArgs = process.argv;

var func = nodeArgs[2];
var entry = nodeArgs[3];

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 4; i < nodeArgs.length; i++) {

    entry = entry + "+" + nodeArgs[i];

}

// deciding which function to do
if(func === 'concert-this') {
    concert(entry);
} else if(func === 'spotify-this-song') {
   spot(entry);
    
} else if(func === 'movie-this'){
    movie(entry);
} else if("do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
          }
        var dataArr = data.split(",");
        var entry = dataArr[1];
        if(dataArr[0] === 'concert-this') {
            concert(entry)
        } else if(dataArr[0] === 'spotify-this-song') {
            spot(entry);
        } else if(dataArr[0] === 'movie-this') {
            movie(entry);
        }
    })
    
}

// Calls on bands in town API and returns concert information about the artist a user inputs
function concert(entry) {
    console.log(entry)
    var moment = require("moment");
    var text = "";

    request("https://rest.bandsintown.com/artists/" + entry + "/events?app_id=codingbootcamp", function(error, response, body) {
        if(error && response != 200) {
            return console.log("error: ") + error;

        } else {
            var result = JSON.parse(body)[0];

            console.log(result)
            console.log("Venue name: " + result.venue.name);
            console.log("Location: " + result.venue.city + ", " + result.venue.region + ", " + result.venue.country );
            console.log(moment(result.datetime).format("MM/DD/YYYY"));

            text += "Venue name: " + result.venue.name + "\n" + "Location: " + result.venue.city + ", " + result.venue.region + ", " +
                     result.venue.country + "\n" + moment(result.datetime).format("MM/DD/YYYY") + "\n" + "\nt";
            // appends to a file called log.txt
            fs.appendFile("log.txt", text, function(err) {

                // If an error was experienced we will log it.
                if (err) {
                  return console.log(err);
                }
              
                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                  console.log("Content Added!");
                }
            
            })
        }

    })
}

// Calls on the spotify API to generate song information about the user's song input
function spot(entry) {
    var text = "";
    // if user doesn't specify it defaults to "The Sign"
    if(entry === undefined) {
        entry = "The Sign";
    }
    
    spotify.search({ type: 'track', query: entry}, function(error, data) {
        if(error) {
            return console.log("Error: " + error);
        } else {
            var first = data.tracks.items[0];
            
            var artists = first.artists;
            artists.forEach(function(artist){
                console.log("Artist: " + artist.name);
                text += "Artist: " + artist.name + "\n";
            })
            //console.log(artists.name)
            console.log(first.name);
            text += first.name + "\n";
            if(first.preview_url !== null) {
                console.log(first.preview_url)
                text += first.preview_url + "\n";
            }
            console.log(first.album.name)
            text += first.album.name + "\n" + "\n";
            
            // Writes this information to log.txt
            fs.appendFile("log.txt", text, function(err) {

                // If an error was experienced we will log it.
                if (err) {
                  return console.log(err);
                }
              
                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                  console.log("Content Added!");
                }
            
            })


            
        }
    })
    
}

// Calls on the OMDB API to provide information about the user's movie input
function movie(entry) {
    var text = "";
    // If user doesn't specify, entry defaults to "Mr. Nobody"
    if (entry === undefined) {
        entry = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + entry + "&y=&plot=short&apikey=trilogy";



    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            var movie = JSON.parse(body);
           // console.log(movie)
            console.log("Title: " + movie.Title)
            console.log("Release Date: " + movie.Released);
            
            console.log("IMDB Rating: " + movie.Ratings[0]["Value"]);
            console.log("Rotten Tomatoes Rating: " + movie.Ratings[1]["Value"]);
            console.log("Country Produced: " + movie.Country);
            console.log("Language of the Movie " + movie.Language);
            console.log("Plot: " + movie.Plot);
            console.log("Actors: " + movie.Actors);

            text += "Title: " + movie.Title + "\n";
            text += "Release Date: " + movie.Released + "\n";
            text += "IMDB Rating: " + movie.Ratings[0]["Value"] + "\n";
            text += "Rotten Tomatoes Rating: " + movie.Ratings[1]["Value"] + "\n";
            text += "Country Produced: " + movie.Country + "\n";
            text += "Language of the Movie " + movie.Language + "\n";
            text += "Plot: " + movie.Plot + "\n";
            text += "Actors: " + movie.Actors + "\n" + "\n";

            // Append above text to log.txt
            fs.appendFile("log.txt", text, function(err) {

                // If an error was experienced we will log it.
                if (err) {
                  return console.log(err);
                }
              
                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                  console.log("Content Added!");
                }
            
            })


          }
    });
}









    


