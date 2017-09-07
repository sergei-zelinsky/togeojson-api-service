const express = require('express');
const DOMParser = require('xmldom').DOMParser;
const toGeoJSON = require('@mapbox/togeojson');
const https = require('https');
const fetch = require('node-fetch');

const app = express();

app.get('/api/toGeoJSON/kml', function(req, res){
  const kmlURL = req.query.url;
  if (!kmlURL){
    res.sendStatus(400);
    return;
  }
  const kmlDecodedURL = decodeURIComponent(kmlURL);
  console.log(kmlDecodedURL);
  fetch(kmlDecodedURL)
    .then(function(response){
      return response.text();
    })
    .then(function(xmlString){
      const xml = new DOMParser().parseFromString(xmlString);
      const geoJSON = toGeoJSON.kml(xml);

      res.setHeader("Access-Control-Allow-Origin", "*");

      res.json(geoJSON)
    })
});

app.listen(9000, function(error){
  if (error){
    throw error;
  }
  console.log('Server is running on port 4000.');
});