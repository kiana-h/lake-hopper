# Lake Hopper

Live Website: [https://lakehopper.io](https://lakehopper.io/)

I created Lake Hopper to record my backpacking trips. As an avid backpacker, I wanted a place where I could see all of my past trips and save all the routes, photos, and notes for every trip in one place.

I had found myself using multiple apps for backpacking: AllTrails for creating new routes, Garmin for recording activities, Strava for trip analysis/notes, and Google Photos for albums. Lake Hopper combines all of these features in one app and makes it much simpler to save all the information for a trip in a single location and to get an overview of all of your backpacking trips!

Lake Hopper runs on a Rails/PostgreSQL backend, uses React.js and Redux on the frontend, and MapBox GL for map interactivity.

## Features

1. **Trip Dashboard:** Displaying all of a user's trips on a map, along with a summary of each trip. MapBox GL has been integrated for displaying the trips based on coordinates, searching (with geocoding), as well as filtering the trips based on map bounds.

2. **Two Modes for Trip Creation:**
- **Draw Mode:** Users can draw and edit custom routes on a map using waypoints. Mapbox Directions API has been used to generate and draw the optimal path between given waypoints.
- **Upload Mode:** Users can upload multiple activity files from their smartwatch/fitness app, which are parsed using an xml parser and processed to gather relevant information such as average heart rate, calories, active time, etc.

3. **Trip Stats:** Calculation of overall distance and elevation gain for all trips + calories, active time, and average heart rate for trips recorded with a smartwatch/fitness app. Elevation information is fetched from Google Elevation API which provides elevation based on the GPS coordinates of a series of waypoints along a path. 

4. **Cloud Storage for Photos:** AWS S3 cloud storage integration.

5. **User Authentication:** User authentication using BCrypt.

## Trip Dashboard:

![Trip Index](https://raw.githubusercontent.com/kiana-h/lake-hopper/master/readme_assets/trip-index.png)

## Drawing Routes: MapBox API integration for route creation

- **Navigation:** Users can navigate to their target location by using the search bar which implements the MapBox geocoding API to translate an address to GPS coordinates. 
- **Creating Markers:** Clicking on the map creates a marker at the given coordinates and the optimal route is calculated using Mapbox Directions API which provides the coordinates for the points along the path. 
- **Editing Markers:** Users can edit the path by draggin the markers around, which updates the marker coordinates and redraws the routes and recalculates the overall distance and elevation gain.  
- **Drawing on the Map:** A MapDrawer class is designed to keep track of all the sources, layers, and markers. The routes are transformed into a geoJSON object which is overlayed on the map. 
- **Clearing the Map:** A clear button is added to erase all the drawn elements on the map and reset the MapDrawer class. 
- **Distance / Elevation Gain:** Mapbox provides the distance between the given markers. It does not, however, provide any elevation information. So the elevation for each coordinate along the path is fetched from Open Elevation API. The overall elevation gain is calculated by iterating through and adding up all the points along the path (not just the markers).  

![Drawing Routes](https://github.com/kiana-h/lake-hopper/blob/master/readme_assets/draw_video.gif)

## Uploading Routes: Parsing files generated by smartwatch

- **Uploading Activity Files:** Users can upload tcx files* (from a smartwatch) to Lake Hopper. The files are then parsed using a custom tcxParser class, which uses xmlParser as a base and then goes through each waypoint (coordinates along the activity path) and restructures the information to fit the Lake Hopper schema and removes unneccessary/broken elements. The summary stats (distance, elevation, etc.) are saved so there won't be a need to loop through the waypoints to calculate them again. Given the large quantity of waypoints, they are inserted into the trip table as a blob. 
- **Drawing on the Map:** Similar to the draw mode, a MapDrawer class manages all the sources, layers, and markers. Unlike the draw mode, there is no edit functionality, since all the information is provided by the files. 
- **Distance / Elevation Gain / Average Heart Rate / Calories / Active Time:** The overall trip stats are calculated when the trip is created, so there is no need to fetch the waypoints on the index page (which reduces the load time significantly). The waypoints are only loaded on the trip show page in order to render the route on the map.

* There are many different file types for recorded activites, but I started with tcx because it seemed to be the most "information-rich" type. It not only includes GPS coordinates, but also additional information like heart rate, calories, etc. 

![Uploading Routes](https://github.com/kiana-h/lake-hopper/blob/master/readme_assets/upload_video.gif)

## Creating New Trips

Each trip is created from a combination of form and map data. The form contains the trip title, description, photos, etc. The map includes the routes and all the waypoints. The waypoints contain GPS coordinates, elevation, and (if taken from a smarwatch) heart rate, calories, speed, and more. The overall trip stats are calculated by aggregation of information from individual waypoints.

A main TripCreator component is responsible for managing the state and communicating between the form and the map components. Once the trip is submitted, the Trip Creator combines and organizes the data and sends it over to the Rails trip controller. 

## Displaying Trips

![Trip Index](https://github.com/kiana-h/lake-hopper/blob/master/readme_assets/trip-show.png)

## Technologies

- Ruby on Rails
- MapBox (GL, Directions API, Geocoding)
- Google Elevation API
- React + Redux
- Material UI
