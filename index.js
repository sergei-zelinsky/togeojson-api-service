const express = require('express');
const DOMParser = require('xmldom').DOMParser;
const toGeoJSON = require('@mapbox/togeojson');
const https = require('https');
const fetch = require('node-fetch');
const crossdomain = require('./middlewares/crossdomain');

const AVAILABLE_INPUT_FORMATS = ['kml', 'gpx'];

const app = express();

const domParser = new DOMParser();

app.use(crossdomain);

app.get('/', (req, res) => {
  res.end('OK');
});

app.get('/api/toGeoJSON/:inputType', async (req, res) => {
  const {query: {url}, params: {inputType}} = req;

  if (!AVAILABLE_INPUT_FORMATS.includes(inputType) || typeof url === 'undefined'){
    return res.sendStatus(400);
  }

  const decodedURL = decodeURIComponent(url);

  try {
    const xml = domParser.parseFromString(
      await (await fetch(decodedURL)).text(),
      'text/xml'
    );
    const geoJSON = toGeoJSON[inputType](xml);

    res.json(geoJSON)
  } catch (e){
    res.sendStatus(400);
  }
});

const {PORT = 9000} = process.env;

app.listen(PORT, error =>  {
  if (error) {
    throw error;
  }
  console.log(`Server is running on port ${PORT}.`);
});
