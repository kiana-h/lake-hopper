import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default class MarkerDrawer {
  constructor(map, token) {
    this.map = map;
    this.token = token;
    this.color = {
      head: "#4051b5",
      tail: "#BC9CFF",
      line: "#4051b5",
    };
  }
  addNavigationControl = () => {
    this.map.addControl(new mapboxgl.NavigationControl());
  };
  addGeoCoder = () => {
    const geocoder = new MapboxGeocoder({
      accessToken: this.token,
      marker: false,
      mapboxgl: mapboxgl,
    });
    this.map.addControl(geocoder);
  };

  addMarker = (coordinates, color, draggable = false) => {
    const newMarker = new mapboxgl.Marker({
      color: color,
      draggable: draggable,
    })
      .setLngLat(coordinates)
      .addTo(this.map);
    return newMarker;
  };

  addPath = (coordinates, id) => {
    this.map.addSource(id, {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordinates,
        },
      },
    });
    this.map.addLayer({
      id: id,
      type: "line",
      source: id,
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": this.color.line,
        "line-width": 4,
      },
    });
  };

  //reset path on map based on new coordinates
  resetPath = (coordinates, id) => {
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: coordinates,
      },
    };
    this.map.getSource(`route-${id}`).setData(geojson);
  };

  drawUploadedRoutes = (routes) => {
    let route, coordinates, id, lap;

    const firstLap = routes[0].trackpoints[0];
    const firstPoint = [firstLap[0].lng, firstLap[0].lat];

    // start the map view bounds on the first point of the trip
    let boundingBox = new mapboxgl.LngLatBounds(firstPoint, firstPoint);

    // go through every lap of everyroute
    for (let routeNum in routes) {
      route = routes[routeNum];
      for (let i = 0; i < route.trackpoints.length; i++) {
        lap = route.trackpoints[i];
        id = `route-${routeNum}-${i}`;
        // combine all the coordinates for that lap
        coordinates = this.getCleanCoords(lap);
        // adjust the map view bounds to include that lap
        this.adjustBounds(boundingBox, coordinates);
        // draw the lap on the map
        this.addPath(coordinates, id);
      }
    }

    const markers = this.getMarkers(routes);
    let color;
    for (let i = 0; i < markers.length; i++) {
      (color = i === 0 ? this.color.head : this.color.tail),
        this.addMarker(markers[i], color);
    }
  };

  getCleanCoords = (lap) => {
    return lap.map((trackpoint) => [trackpoint.lng, trackpoint.lat]);
  };

  adjustBounds = (boundingBox, coordinates) => {
    boundingBox = coordinates.reduce((bounds, coord) => {
      return bounds.extend(coord);
    }, boundingBox);
    this.map.fitBounds(boundingBox, {
      padding: 50,
    });
  };

  getMarkers = (routes) => {
    let markers = routes.map((activity) => {
      let point = activity.trackpoints[0][0];
      return [point.lng, point.lat];
    });
    let lastLap =
      routes[routes.length - 1].trackpoints[
        routes[routes.length - 1].trackpoints.length - 1
      ];
    let point = lastLap[lastLap.length - 1];
    markers.push([point.lng, point.lat]);
    return markers;
  };
}

///////

// export const addNavigationControl = (map) => {
//   map.addControl(new mapboxgl.NavigationControl());
// };

// export const addGeoCoder = (map, token) => {
//   const geocoder = new MapboxGeocoder({
//     accessToken: token,
//     marker: false,
//     mapboxgl: mapboxgl,
//   });
//   map.addControl(geocoder);
// };

// export const addMarker = (coordinates, map, color) => {
//   new mapboxgl.Marker({
//     color: color,
//   })
//     .setLngLat(coordinates)
//     .addTo(map);
// };

// //draw new path on the map
// export const addPath = (coordinates, id, map) => {
//   map.addSource(id, {
//     type: "geojson",
//     data: {
//       type: "Feature",
//       properties: {},
//       geometry: {
//         type: "LineString",
//         coordinates: coordinates,
//       },
//     },
//   });
//   map.addLayer({
//     id: id,
//     type: "line",
//     source: id,
//     layout: {
//       "line-join": "round",
//       "line-cap": "round",
//     },
//     paint: {
//       "line-color": "#fe9e9f",
//       "line-width": 4,
//     },
//   });
// };

// //reset path on map based on new coordinates
// export const resetPath = (coordinates, id, map) => {
//   const geojson = {
//     type: "Feature",
//     properties: {},
//     geometry: {
//       type: "LineString",
//       coordinates: coordinates,
//     },
//   };
//   map.getSource(`route-${id - 1}`).setData(geojson);
// };

// export const drawUploadedRoutes = (routes, map) => {
//   let route, coordinates, id, lap;

//   const firstLap = routes[0].trackpoints[0];
//   const firstPoint = [firstLap[0].lng, firstLap[0].lat];

//   // start the map view bounds on the first point of the trip
//   let boundingBox = new mapboxgl.LngLatBounds(firstPoint, firstPoint);

//   // go through every lap of everyroute
//   for (let routeNum in routes) {
//     route = routes[routeNum];
//     for (let i = 0; i < route.trackpoints.length; i++) {
//       lap = route.trackpoints[i];
//       id = `route-${routeNum}-${i}`;
//       // combine all the coordinates for that lap
//       coordinates = getCleanCoords(lap);
//       // adjust the map view bounds to include that lap
//       adjustBounds(boundingBox, coordinates, map);
//       // draw the lap on the map
//       addPath(coordinates, id, map);
//     }
//   }

//   const markers = getMarkers(routes);
//   let color;
//   for (let i = 0; i < markers.length; i++) {
//     (color = i === 0 ? color.head : color.tail),
//       addMarker(markers[i], map, color);
//   }
// };

// const getCleanCoords = (lap) => {
//   return lap.map((trackpoint) => [trackpoint.lng, trackpoint.lat]);
// };

// const adjustBounds = (boundingBox, coordinates, map) => {
//   boundingBox = coordinates.reduce((bounds, coord) => {
//     return bounds.extend(coord);
//   }, boundingBox);
//   map.fitBounds(boundingBox, {
//     padding: 50,
//   });
// };

// const getMarkers = (routes) => {
//   let markers = routes.map((activity) => {
//     let point = activity.trackpoints[0][0];
//     return [point.lng, point.lat];
//   });
//   let lastLap =
//     routes[routes.length - 1].trackpoints[
//       routes[routes.length - 1].trackpoints.length - 1
//     ];
//   let point = lastLap[lastLap.length - 1];
//   markers.push([point.lng, point.lat]);
//   return markers;
// };
