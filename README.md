# Lake Hopper

[Live Website]() (https://lakehopper.io)

I initially created Lake Hopper to record my own backpacking trips. As an avid backpacker, I wanted a place where I could see all of my past trips and easily save all the routes, photos, and notes for every trip. 
I use alltrails, garmin, and strava heavily for different purposes. But none of them did _quite_ what I wanted in terms of backpacking trips. They each have lots of features that I did not really need (like social media integrarion), and were missing some key features I needed (like the ability to combine multiple activities into a single trip). 
Lake Hopper is continuing to evolve, blah blah

Lake hopper has a straight-forward backend setup (Rails + PostgreSQL) which handles the users, trips, and activities. Photos are saved in AWS s3 which is integrated into Rails. Most of the interesting and challenging stuff happens in the front-end (React + Redux). MapBox GL was integrated to handle the map interactivity, route creation, location search,  


## Features
* Displaying all of a user's trips on a map, along with a summary of each trip. MapBox GL has been used for displaying the trips based on coordinates, searching (with geocoding), as well as filtering the trips based on map bounds. 
* Two methods of creating trips:
  * Draw Mode: Users can draw and edit custom routes on a map using waypoints. Mapbox Directions API has been used to generate and draw the optimal path between given waypoints.
  * Upload Mode: Users can upload multiple activity files from their smartwatch, which are parsed using an xml parser and processed to gather relevant information such as average heart rate, calories, active time, etc. 
* Calculation of overall distance and elevation gain for each trip. Distance information is directly taken from either MapBox or the uploaded file. However, neither of them provide elevation information. Open Elevation API has been utilized to get the elevation of each waypoint using coordinates.   
* Saving photos using active storage + aws s3 cloud storage. 
* Secure frontend to backend user authentication using BCrypt.

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

![Route creation utilities](https://github.com/kiana-h/lake-hopper/draw_route.gif)

## Uploading Routes: Parser for uploading trips recorded on a smartwatch

xml parser: extract and calculate relevant information
Map Drawer


## Creating new trips 
Each trip is created from a combination of form and map data. The form contains the trip title, description, photos, etc. The map includes the start point and all the waypoints. The waypoints contain GPS coordinates, elevation, and (if taken from a smarwatch) heart rate, calories, speed, and more. The overall trip stats are calculated by aggregation of information from individual waypoints. 

A main Trip Creator component is responsible for managing the state and communicating between the form and the map components while the user is inputting data. Once the trip is submitted, the trip component 

![Creating new activities](https://github.com/kiana-h/new_activity.gif)




## Technologies
* Ruby on Rails: built-in support of relational databases and RESTful routes.
* MapBox & Open-Elevation API: 
* React + Redux: Front end Redux states are kept normalized and separate, with individual reducers and actions for trips, ui, session management, and errors. This keeps the state normalized, mimicking the data stored in the database and easing the updating of records.
* Material UI:

### Additional resources
+ [Routes and API Endpoints](https://github.com/kiana-h/lake-hopper/wiki/Routes)
+ [Database Schema](https://github.com/kiana-h/lake-hopper/wiki/Schema)
