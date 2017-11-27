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

    let songName = process.argv[3];
    let spotifyClient = new Spotify(spotifyKeys);

    if (!songName) {

        console.log("Not a valid song.");

        spotifyClient
            .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
            .then(function (data) {

                console.log(data);
                console.log("-----------------------");
                console.log("Artist(s): " + data.artists[0].name);
                console.log("Title: " + data.name);
                console.log("Preview Link: " + data.preview_url);
                console.log("Album: " + data.album.name);

            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });

    } else if (songName) {

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
    }

} else if (command === 'movie-this') {

    let movieName = process.argv[3];

    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            let movieData = JSON.parse(body)

            // Parse the body of the site and recover just the imdbRating
            console.log(movieData);
            console.log("-----------------------");
            console.log("Title: " + movieData.Title);
            console.log("Year: " + movieData.Year);
            console.log("IMDB Rating: " + "");
            console.log("Rotten Tomatoes Rating: " + "");
            console.log("Country: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("Plot: " + movieData.Plot);
            console.log("Actors: " + movieData.Actors);
        }
    });

} else if (command === 'do-what-it-says') {

    // do-what-it-says logic

} else {
    console.log('Command not recognized.');
}