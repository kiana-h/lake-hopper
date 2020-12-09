# Lake Hopper

[Live Website]() (https://lakehopper.io)

I initially created Lake Hopper to record my own backpacking trips. As an avid backpacker, I wanted a place where I could see all of my past trips and save all the routes, photos, and notes for every trip in one place.

I had found myself using multiple apps for backpacking: AllTrails for creating new routes, Garmin for recording activities, Strava for trip analysis/notes, and Google Photos for albums. Lake Hopper combines all of these features in one app and makes it much simpler to save all the information for a trip in a single location and to get an overview of all of your backpacking trips!

Lake Hopper runs on a Rails/PostgreSQL backend, uses React.js and Redux on the frontend, and MapBox GL for map interactivity.

Lake Hopper is a web app created for backpackers which allows them to see all of their trips, create routes, upload activities from their fitness app or smartwatch, save photos and notes for each trip, and get stats like overall distance and elevation gain for multi-day trips.

## Features

1. **Trip Dashboard:** Displaying all of a user's trips on a map, along with a summary of each trip. MapBox GL has been integrated for displaying the trips based on coordinates, searching (with geocoding), as well as filtering the trips based on map bounds.

2. **Two Modes for Trip Creation:**
- **Draw Mode:** Users can draw and edit custom routes on a map using waypoints. Mapbox Directions API has been used to generate and draw the optimal path between given waypoints.
- **Upload Mode:** Users can upload multiple activity files from their smartwatch/fitness app, which are parsed using an xml parser and processed to gather relevant information such as average heart rate, calories, active time, etc.

3. **Trip Stats:** Calculation of overall distance and elevation gain for all trips. Elevation information has been gathered through Open Elevation API which provides elevation based on the GPS coordinates of a given waypoint. Calculation of calories, active time, and average heart rate for trips recorded with a smartwatch/fitness app.

4. **Cloud Storage for Photos:** AWS S3 cloud storage integration.

5. **User Authentication:** Secure frontend to backend user authentication using BCrypt.

## Creating Routes On A Map:

An outdoor-activity-focused map
Reset
Stats


![Route creation utilities](https://github.com/kiana-h/lake-hopper/route_creation_modes.png)

## Drawing Routes: MapBox API integration for route creation

Search using MapBox GL geocoding:
Handle click:
Handle drag:

```js
drawPath = async (rawCoordinates, distance) => {
  //generate id for mapbox layer based on path index
  const i = this.state.markers.length - 2;
  const id = `route-${i}`;
  // draw the path
  this.MapDrawer.addPath(rawCoordinates, id);
  // fetch elevation data
  const elevationData = await MapApiUtil.fetchElevation(rawCoordinates);
  const { elevation_gain, trackpoints } = elevationData;
  // create new route and push to trip creator (parent component)
  let routes = { ...this.props.routes };
  routes[i] = {
    trackpoints: [trackpoints],
    distance: distance,
    elevation_gain: elevation_gain,
  };
  this.props.updateRoutes(routes);
  // toggle loading state
  this.props.toggleCalc(false);
};
```

Calculation of distance and elevation gain:
![Creating new activities](https://github.com/kiana-h/lake-hopper/readme_assets/02_draw_1080.mov)
![Route creation utilities](https://github.com/kiana-h/lake-hopper/draw_route.gif)

## Uploading Routes: Parser for uploading trips recorded on a smartwatch

xml parser: extract and calculate relevant information
Map Drawer

## Creating new trips

Each trip is created from a combination of form and map data. The form contains the trip title, description, photos, etc. The map includes the start point and all the waypoints. The waypoints contain GPS coordinates, elevation, and (if taken from a smarwatch) heart rate, calories, speed, and more. The overall trip stats are calculated by aggregation of information from individual waypoints.

A main Trip Creator component is responsible for managing the state and communicating between the form and the map components while the user is inputting data. Once the trip is submitted, the trip component

![Creating new activities](https://github.com/kiana-h/new_activity.gif)

## Technologies

- Ruby on Rails: built-in support of relational databases and RESTful routes.
- MapBox & Open-Elevation API:
- React + Redux: Front end Redux states are kept normalized and separate, with individual reducers and actions for trips, ui, session management, and errors. This keeps the state normalized, mimicking the data stored in the database and easing the updating of records.
- Material UI:

### Additional resources

- [Routes and API Endpoints](https://github.com/kiana-h/lake-hopper/wiki/Routes)
- [Database Schema](https://github.com/kiana-h/lake-hopper/wiki/Schema)
