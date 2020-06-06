const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/:id/stats', (req, res) => {
    // Provide a route for returning stats in a given short link, including:
    // When the short link was created
    // How many times the short link has been visited total
    // A histogram of number of visits to the short link per day
    })

app.get('/:id', (req, res) => {
    // Of course, the server itself should handle redirecting short links to the URLs it creates
    // check if short url exists, if yes, redirect
    })

// app.get('/shorten', (req, res) => {
//         console.log('HELLO')
//         res.end();
//     })
app.post('/shorten', (req, res) => {
        // Create a random short link for arbitrary URLs, e.g., bit.ly/2FhfhXh
        // The same URL should always generate the same random shortlink
        //Allow creating custom short links to arbitrary URLs, e.g., bit.ly/my-custom-link
        
        // if no long url, throw error
        // if customShortId is not blank, find the path part
        // determine if path is valid or if is taken
    })

// this as the last route in order to prevent unwanted behaviour
// app.get('*', (req, res) => {
    // res.json({
//         message: 'bad endpoint'
//     });
// });

module.exports = app;