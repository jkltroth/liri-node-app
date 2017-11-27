const request = require("request");
const Twitter = require("twitter");
const fs = require('fs');
const twitterKeys = require("./twitterKeys.js");
const spotifyKeys = require("./spotifyKeys.js");
const file = "random.txt";

const command = process.argv[2].toLowerCase();


if (command === 'my-tweets') {

    var client = new Twitter(twitterKeys);

    client.get('statuses/user_timeline', {
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

    // spotify-this-song logic

} else if (command === 'movie-this') {

    // movie-this logic

} else if (command === 'do-what-it-says') {

    // do-what-it-says logic

} else {
    console.log('Command not recognized.');
}