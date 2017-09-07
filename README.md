# togeojson-api-service
Simple REST API service for converting KML and GPX to GeoJSON using mapbox/togeojson library.

## Demo

Deployed version of this repository can be accessible by https://togeojson-api-service.herokuapp.com.

[KML Samples](https://developers.google.com/kml/documentation/KML_Samples.kml) document from [KML Tutorial](https://developers.google.com/kml/documentation/kml_tut) was used as an example of the input document.

The conversion result is available [here](https://togeojson-api-service.herokuapp.com/api/toGeoJSON/kml?url=https://developers.google.com/kml/documentation/KML_Samples.kml).


## API

### `/`

**Methods:** GET

**Responses:** 
- `200` - always if server is running

### `/api/toGeoJson/:inputType`

**Methods:** GET

**Params:**
- `inputType` - `kml` or `gpx`, required

**Query:**
- `url` - absolute URL to the input file, required

**Responses:** 
- `200`- the body of response contains converted GeoJSON
- `400` - if there were some problems: can not load or convert input document
or required params were missed
 
**URL example:** 
```
/api/toGeoJson/kml?url=http://example.com/path/to/file.kml
```

or

```
/api/toGeoJson/gpx?url=http://example.com/path/to/file.gpx
```



