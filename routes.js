const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { createShortUrl, getLongUrl, incrementVisitCount, getStatsById } = require('./short-url');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/:id/stats', (req, res) => {
    const id = req.params.id;
    const stats = getStatsById(id);
    if (!stats) {
        return res.status(404)
        .json({ message: `no stats for ${id}` });
    }
    res.json(stats);
})

app.get('/:id', (req, res) => {
    const id = req.params.id;
    const longUrl = getLongUrl(id);
    if (!longUrl) {
        return res.status(404)
            .json({ message: `${id} id cannot be found` });
    }
    incrementVisitCount(id);
    res.redirect(longUrl);
})

app.post('/shorten', (req, res) => {
    const { long_url: longUrl = '', custom_short_id: customShortId = '' } = req.body;
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