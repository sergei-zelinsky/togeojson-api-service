# togeojson-api-service
Simple REST API service for converting KML and GPX to GeoJSON using mapbox/togeojson library.

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
- `400` - there were some problems (can not load or convert input document)
 
**URL example:** 
```
/api/toGeoJson/kml?url=http://example.com/path/to/file.kml

```

or

```
/api/toGeoJson/gpx?url=http://example.com/path/to/file.gpx
```



