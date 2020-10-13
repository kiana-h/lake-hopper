export default class MarkerManager {
  constructor(map, handleClick) {
    this.map = map;
    this.markers = {};
    this.handleClick = handleClick;
  }
  updateMarkers(trips) {
    // convert trips array into object
    // to get constant time looking up the trips
    const single = trips.length > 1 ? false : true;
    const tripsObj = {};
    trips.forEach((trip) => {
      tripsObj[trip.id] = trip;
    });
    trips
      .filter((trip) => !this.markers[trip.id])
      .forEach((newTrip) => this.createMarkerFromTrip(newTrip, single));

    Object.keys(this.markers)
      .filter((id) => !tripsObj[id])
      .forEach((id) => {
        this.removeMarker(this.markers[id]);
      });
  }

  createMarkerFromTrip(trip, single) {
    const position = new LngLat(trip.lat, trip.lng);
    const marker = new mapboxgl.Marker().setLngLat(position);

    if (single) {
      map.flyTo({
        center: position,
        essential: true,
      });
    }

    marker.addListener("click", () => {
      this.handleClick(trip);
    });
    this.markers[trip.id] = marker;
    // marker.setMap(this.map);
  }

  removeMarker(marker) {
    marker.remove();
    delete this.markers[marker.id];
  }
}
