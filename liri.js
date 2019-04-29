require("dotenv").config();

// require the axios, node, and linking other files.
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');


var command = process.argv[2];
var subject = process.argv.slice(3).join(" ");
var spotify = new Spotify(keys.spotify);

// calling spotify api and console.log song information. 
var findSpotify = function(song){
    
    spotify
      .search({ type: 'track', query: song })
      .then(function(response) {
          var songInfo = response.tracks.items;
          for (var i=0; i < 3; i++){
              console.log("Artist(s): " + songInfo[i].artists[0].name);
              console.log("Song name: " + songInfo[i].name);
              console.log("Preview: " + songInfo[i].preview_url);
              console.log("Album: " + songInfo[i].album.name);
              console.log("------------------------------------------");
              
          }
      })
      .catch(function(err) {
        console.log(err);
      });
      
 };
// create a function that will allowed users to command the LIRI
var LIRI = function () {
    if (!subject){
        subject = "baby shark"
    }

    if (command === "spotify-this-song") {
        console.log(findSpotify(subject));
    } else if (command === "concert-this") {

    } else if (command === "movie-this") {

    } else if (command === "do-what-it-says") {

    } else {
        console.log("LIRI doesn't understand.");
    }
};
LIRI()




