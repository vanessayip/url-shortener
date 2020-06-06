const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { createShortUrl, getLongUrl, incrementVisitCount, getStatsById } = require('./short-url');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/:id/stats', (req, res) => {
    // Provide a route for returning stats in a given short link, including:
    // When the short link was created
    // How many times the short link has been visited total
    // A histogram of number of visits to the short link per day
    const id = req.params.id;
    const stats = getStatsById(id);
    if (!stats) {
        return res.status(404)
        .json({ message: `no stats for ${id}` });
    }
    res.json(stats);
})

app.get('/:id', (req, res) => {
    // Of course, the server itself should handle redirecting short links to the URLs it creates
    // check if short url exists, if yes, redirect
    const id = req.params.id;
    const longUrl = getLongUrl(id);
    if (!longUrl) {
        return res.status(404)
            .json({ message: `${id} id cannot be found` });
    }
    incrementVisitCount(id);
    res.redirect(longUrl);
})

// app.get('/shorten', (req, res) => {
//         console.log('HELLO')
//         res.end();
//     })
// Create a random short link for arbitrary URLs, e.g., bit.ly/2FhfhXh
// The same URL should always generate the same random shortlink
// Allow creating custom short links to arbitrary URLs, e.g., bit.ly/my-custom-link
app.post('/shorten', (req, res) => {
    const { longUrl = '', custom_short_id: customShortId = '' } = req.body;
    if (!longUrl) {
        return res
            .status(400)
            .json({ message: 'missing long url'});
    }
    const obj = createShortUrl(longUrl, customShortId);
    return res
        .status(200)
        .json(obj);
})

// this as the last route in order to prevent unwanted behaviour
app.get('*', (req, res) => {
    return res.status(400)
        .json({ message: 'bad endpoint' });
});

module.exports = app;