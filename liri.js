// Initializing all of my npm's, API keys, etc.
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const request = require("request");
const fs = require('fs');
const twitterKeys = require("./twitterKeys.js");
const spotifyKeys = require("./spotifyKeys.js");
const file = "random.txt";

// Capturing the users command/searchCriteria input and assinging to variables
let command = process.argv[2];
let searchCriteria = process.argv[3];

// A function to run the my-tweets command
const myTweets = function () {

    let twitterClient = new Twitter(twitterKeys);

    twitterClient.get('statuses/user_timeline', {
        screen_name: 'jkltroth',
        count: 20
    }, function (error, tweets, response) {
        if (!error) {

            tweets.forEach(function (element) {
                console.log("-----------------------");
                console.log("Created At: " + element.created_at);
                console.log("Tweet: " + element.text);
            });
        }
    });
}

// A function to run the spotify-this-song command
const spotifyThisSong = function () {

    let spotifyClient = new Spotify(spotifyKeys);

    if (!searchCriteria) {

        spotifyClient
            .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
            .then(function (data) {

                console.log("-----------------------");
                console.log("Title: " + data.name);
                console.log("Artist(s): " + data.artists[0].name);
                console.log("Album: " + data.album.name);
                console.log("Preview Link: " + data.preview_url);

            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });

    } else if (searchCriteria) {

        spotifyClient.search({
            type: 'track',
            query: searchCriteria,
            limit: 1,
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            let trackData = data.tracks.items[0];
            let artistsArray = [];

            trackData.artists.forEach(function (element) {
                artistsArray.push(element.name);
            });

            console.log("-----------------------");
            console.log("Title: " + trackData.name);
            console.log("Artist(s): " + artistsArray.join(", "));
            console.log("Album: " + trackData.album.name);

            if (!trackData.preview_url) {
                console.log("No preview link available.");
            } else if (trackData.preview_url) {
                console.log("Preview Link: " + trackData.preview_url);
            }
        });
    }
}

// A function to run the movie-this command
const movieThis = function () {

    if (!searchCriteria) {

        // Run a request to the OMDB API for Mr. Nobody
        request("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=40e9cece", function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

                let movieData = JSON.parse(body)

                // Parse the body of the site and console.log data
                console.log("-----------------------");
                console.log("Title: " + movieData.Title);
                console.log("Year: " + movieData.Year);
                console.log("IMDB Rating: " + movieData.Ratings[0].Value);
                console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
                console.log("Country: " + movieData.Country);
                console.log("Language: " + movieData.Language);
                console.log("Plot: " + movieData.Plot);
                console.log("Actors: " + movieData.Actors);
            }
        });

    } else if (searchCriteria) {

        // Run a request to the OMDB API for searchCriteria
        request("http://www.omdbapi.com/?t=" + searchCriteria + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

                let movieData = JSON.parse(body)

                // Parse the body of the site and console.log data
                console.log("-----------------------");
                console.log("Title: " + movieData.Title);
                console.log("Year: " + movieData.Year);
                console.log("IMDB Rating: " + movieData.Ratings[0].Value);
                console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
                console.log("Country: " + movieData.Country);
                console.log("Language: " + movieData.Language);
                console.log("Plot: " + movieData.Plot);
                console.log("Actors: " + movieData.Actors);
            }
        });
    }
}

// A function to run the do-what-it-says command
const doWhatItSays = function () {

    fs.readFile(file, 'utf-8', function (error, data) {
        if (error) {
            return console.log(error);
        } else {

            let randomFileArr = data.split(',');
            command = randomFileArr[0].toLowerCase();
            searchCriteria = randomFileArr[1];

            if (command === 'my-tweets') {
                myTweets();
            } else if (command === 'spotify-this-song') {
                spotifyThisSong();
            } else if (command === 'movie-this') {
                movieThis();
            } else {
                console.log('-----------------------');
                console.log('Command not recognized.');
            }
        }
    });
}

if (!command) {
    console.log('-----------------------');
    console.log('Please enter a command.')
    console.log('Command options are: ');
    console.log('> my-tweets');
    console.log('> spotify-this-song');
    console.log('> movie-this');
    console.log('> do-what-it-says');
} else if (command.toLowerCase() === 'my-tweets') {
    myTweets();
} else if (command.toLowerCase() === 'spotify-this-song') {
    spotifyThisSong();
} else if (command.toLowerCase() === 'movie-this') {
    movieThis();
} else if (command.toLowerCase() === 'do-what-it-says') {
    doWhatItSays();
} else {
    console.log('-----------------------');
    console.log('Command not recognized.');
    console.log('Command options are: ');
    console.log('> my-tweets');
    console.log('> spotify-this-song');
    console.log('> movie-this');
    console.log('> do-what-it-says');
}