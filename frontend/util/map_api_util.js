//get route from mapbox api
export const fetchRoute = async (start, end, token, id) => {
  start = getCoords(start);
  end = getCoords(end);
  const url =
    "https://api.mapbox.com/directions/v5/mapbox/walking/" +
    start[0] +
    "," +
    start[1] +
    ";" +
    end[0] +
    "," +
    end[1] +
    "?steps=true&geometries=geojson&access_token=" +
    token;
  const rawResponse = await fetch(url);
  const result = await rawResponse.json();

  return result;
};

//get elevation data from opentopodata
export const fetchElevation = (coordinates) => {
  const path = coordinates.map((coordinate) => {
    return { lat: coordinate[1], lng: coordinate[0] };
  });

  const elevator = new google.maps.ElevationService();

  return new Promise((resolve, reject) => {
    elevator.getElevationAlongPath(
      {
        path: path,
        samples: 256,
      },
      (coordinates) => {
        const elevationData = calcElevationGain(coordinates);
        resolve(elevationData);
      }
    );
  });
};

//helper method: get total elevation gain from an array of coordinate objects
const calcElevationGain = (coordinates) => {
  let elevationChange;
  let elevation_gain = 0;
  let trackpoints = [];
  let trackpoint;
  let currentPoint = coordinates[0].elevation;
  for (let point of coordinates) {
    point.elevation = point.elevation;
    elevationChange = currentPoint - point.elevation;
    if (elevationChange > 0) {
      elevation_gain += elevationChange;
    }
    currentPoint = point.elevation;
    trackpoint = {
      lat: point.location ? point.location.lat() : null,
      lng: point.location ? point.location.lng() : null,
      elevation: point.elevation || null,
    };
    trackpoints.push(trackpoint);
  }
  return { elevation_gain, trackpoints };
};

const getCoords = (marker) => {
  const coords = marker.getLngLat();
  return [coords.lng, coords.lat];
};
