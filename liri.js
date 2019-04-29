require("dotenv").config();

// require the axios, node, and linking other files.
// hide spotify api key from github
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var subject = process.argv.slice(3).join(" ");


// calling spotify api and console.log song information. 
var findSpotify = function (song) {
    if (!song) {
        song = "baby shark"
    }

    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            var songInfo = response.tracks.items;
            for (var i = 0; i < 3; i++) {
                console.log("- - - - - - - - - - - - - - - - ");
                console.log("Artist(s): " + songInfo[i].artists[0].name);
                console.log("Song name: " + songInfo[i].name);
                console.log("Preview: " + songInfo[i].preview_url);
                console.log("Album: " + songInfo[i].album.name);
                console.log("- - - - - - - - - - - - - - - - ");

            }
        })
        .catch(function (err) {
            console.log(err);
        });

};


// calling bandintown api then display data.
var findBand = function (band) {
    if (!band) {
        band = "TobyMac"
    }
    var URL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function (response) {
        var jsonData = response.data[0];
        console.log("- - - - - - - - - - - - - - - - ");
        console.log("Name of the venue: " + jsonData.venue.name);
        console.log("Venue location: " + jsonData.venue.city);
        console.log("Date of the Event: " + jsonData.datetime);
        console.log("- - - - - - - - - - - - - - - - ");
    });
};

// calling omdb api then display info. 
var findMovie = function (movie) {
    if (!movie) {
        movie = "Up"
    }
var URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
axios.get(URL).then(function (response) {
    var jsonData = response.data;
    console.log("- - - - - - - - - - - - - - - - ");
        console.log("Title: " + jsonData.Title);
        console.log("Release Year: " + jsonData.Year);
        console.log("OMDB Rating: " + jsonData.imdbRating);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log("- - - - - - - - - - - - - - - - ");
    });
};

// read random text and add the text from random.txt to command spotify function.
var doWhatitSays = function () {
    fs.readFile("random.txt", "utf8", function(error, data){
   
        if (error) {
            return console.log(error);
          }
        var doThis = data.split(",");
        findSpotify(doThis[1]);
    
    });
};

// create a function that will allowed users to command the LIRI
var LIRI = function () {

    if (command === "spotify-this-song") {
        console.log(findSpotify(subject));
    } else if (command === "concert-this") {
        console.log(findBand(subject));
    } else if (command === "movie-this") {
        console.log(findMovie(subject));
    } else if (command === "do-what-it-says") {
        console.log(doWhatitSays());
    } else {
        console.log("LIRI doesn't understand.");
    }
};
LIRI()




