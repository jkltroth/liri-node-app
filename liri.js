const request = require("request");
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const fs = require('fs');

const twitterKeys = require("./twitterKeys.js");
const spotifyKeys = require("./spotifyKeys.js");
const file = "random.txt";

const command = process.argv[2].toLowerCase();


if (command === 'my-tweets') {

    let twitterClient = new Twitter(twitterKeys);

    twitterClient.get('statuses/user_timeline', {
        screen_name: 'jkltroth',
        count: 20
    }, function (error, tweets, response) {
        if (!error) {

            tweets.forEach(function (element) {
                console.log("-----------------------");
                console.log("Tweet: " + element.text);
                console.log("Created At: " + element.created_at);
            });
        }
    });

} else if (command === 'spotify-this-song') {

    let spotifyClient = new Spotify(spotifyKeys);
    let songName = process.argv[3].toLowerCase();

    spotifyClient.search({
        type: 'track',
        query: songName,
        limit: 1,
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        let trackData = data.tracks.items[0];

        console.log(trackData);
        console.log("-----------------------");
        console.log("Artist(s): " + trackData.artists[0].name);
        console.log("Title: " + trackData.name);
        console.log("Preview Link: " + trackData.preview_url);
        console.log("Album: " + trackData.album.name);
    });

} else if (command === 'movie-this') {

    // movie-this logic

} else if (command === 'do-what-it-says') {

    // do-what-it-says logic

} else {
    console.log('Command not recognized.');
}