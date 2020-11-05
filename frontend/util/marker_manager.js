import mapboxgl from "mapbox-gl";

export default class MarkerManager {
  constructor(map, updateBounds) {
    this.map = map;
    this.markers = {};
    this.updateBounds = updateBounds;
  }
  updateMarkers(trips) {
    // convert trips array into object
    // to get constant time looking up the trips
    const tripsObj = {};
    trips.forEach((trip) => {
      tripsObj[trip.id] = trip;
    });

    // add a marker for each trip added to the view
    trips
      .filter((trip) => !this.markers[trip.id])
      .forEach((newTrip) => this.createMarkerFromTrip(newTrip));

    // remove trips that have left the view
    Object.keys(this.markers)
      .filter((id) => !tripsObj[id])
      .forEach((id) => {
        this.removeMarker(this.markers[id], id);
      });
  }

  createMarkerFromTrip(trip) {
    const position = new mapboxgl.LngLat(trip.location_lng, trip.location_lat);
    const marker = new mapboxgl.Marker().setLngLat(position).addTo(this.map);
    this.markers[trip.id] = marker;
  }

  removeMarker(marker, id) {
    delete this.markers[id];
    marker.remove();
  }
}
