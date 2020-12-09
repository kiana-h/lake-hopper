import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default class MarkerDrawer {
  constructor(map, token) {
    this.map = map;
    this.token = token;
    this.color = {
      head: "#BC9CFF",
      tail: "#4051b5",
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
    const markerObjects = [];
    let color;

    for (let i = markers.length - 1; i >= 0; i--) {
      if (i === 0) {
        color = this.color.head;
      } else {
        color = this.color.tail;
      }

      markerObjects.push(this.addMarker(markers[i], color));
    }
    return markerObjects;
  };

  getCleanCoords = (lap) => {
    let cleanCoords = [];
    lap.forEach((trackpoint) => {
      if (trackpoint.lng && trackpoint.lat) {
        cleanCoords.push([trackpoint.lng, trackpoint.lat]);
      }
    });

    return cleanCoords;
  };

  adjustBounds = (boundingBox, coordinates) => {
    for (let coord of coordinates) {
      boundingBox.extend(coord);
    }
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

  zoomToPath = (routes, firstPoint, generateMapImage) => {
    let firstPointCoords;
    if (!firstPoint) {
      firstPoint = this.getFirstPoint(routes[0].trackpoints[0]);
      firstPointCoords = [firstPoint[0], firstPoint[1]];
    } else {
      firstPointCoords = [
        firstPoint.getLngLat().lng,
        firstPoint.getLngLat().lat,
      ];
    }
    if (routes[0]) {
      let boundingBox = new mapboxgl.LngLatBounds([
        firstPointCoords,
        firstPointCoords,
      ]);
      let route, lap, coordinates;
      // go through every lap of everyroute
      for (let routeNum in routes) {
        route = routes[routeNum];
        for (let i = 0; i < route.trackpoints.length; i++) {
          lap = route.trackpoints[i];
          // combine all the coordinates for that lap
          coordinates = this.getCleanCoords(lap);
          // adjust the map view bounds to include that lap
          this.adjustBounds(boundingBox, coordinates);
        }
      }
    } else {
      this.map.flyTo({
        center: [firstPointCoords[0], firstPointCoords[1]],
        zoom: 9,
      });
    }

    this.map.on("moveend", () => {
      const canvas = this.map.getCanvas();
      const dataUrl = canvas.toDataURL("image/jpeg");
      const blobData = this.dataURItoBlob(dataUrl);
      generateMapImage(blobData);
    });
  };

  dataURItoBlob = (dataURI) => {
    const binary = atob(dataURI.split(",")[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
  };

  getFirstPoint = (lap) => {
    for (let trackpoint of lap) {
      if (trackpoint.lat && trackpoint.lng) {
        return [trackpoint.lng, trackpoint.lat];
      }
    }
  };
}
