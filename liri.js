require("dotenv").config();

// require the axios, node, and linking other files.
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var fs = require("fs");


var command = process.argv[2];
var subject = process.argv.slice(3).join(" ");
var spotify = new Spotify(keys.spotify);

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
                console.log("------------------------------------------");
                console.log("Artist(s): " + songInfo[i].artists[0].name);
                console.log("Song name: " + songInfo[i].name);
                console.log("Preview: " + songInfo[i].preview_url);
                console.log("Album: " + songInfo[i].album.name);
                console.log("------------------------------------------");

            }
        })
        .catch(function (err) {
            console.log(err);
        });

};


// calling bandintown api then display data.
var findBand = function (band) {
    var URL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function (response) {
        var jsonData = response.data[0];
        console.log("Name of the venue: " + jsonData.venue.name);
        console.log("Venue location: " + jsonData.venue.city);
        console.log("Date of the Event: " + jsonData.datetime);
        console.log("------------------------------------------");
    });
};















// create a function that will allowed users to command the LIRI
var LIRI = function () {

    if (command === "spotify-this-song") {
        console.log(findSpotify(subject));
    } else if (command === "concert-this") {
        console.log(findBand(subject));
    } else if (command === "movie-this") {

    } else if (command === "do-what-it-says") {

    } else {
        console.log("LIRI doesn't understand.");
    }
};
LIRI()




