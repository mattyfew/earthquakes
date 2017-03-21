const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const request = require('request');
const config = require('./config.js');

const ROOT_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

app.set('port', process.env.PORT || 8080);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

app.get('/', function(req,res){
    var earthquakeData;

    request(ROOT_URL, function(err, response, body){
        if (err) throw err;
        earthquakeData = JSON.parse(response.body)
        res.render('index.handlebars', {
            earthquakes: earthquakeData.features.slice(0,4),
            apiKey: config.key
        });
    })
});

app.listen(app.get("port"), function() {
    console.log("listening on port " + app.get("port"));
});
