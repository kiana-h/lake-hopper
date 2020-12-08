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
  capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  formatDate(dateString) {
    const date = new Date(dateString);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return monthNames[monthIndex] + " " + day + " " + year;
  }

  createMarkerFromTrip(trip) {
    const position = new mapboxgl.LngLat(trip.location_lng, trip.location_lat);

    const marker = new mapboxgl.Marker({
      color: "#BC9CFF",
      id: trip.id,
    })

      .setLngLat(position)
      // .setPopup(popup)
      .addTo(this.map);

    marker.getElement().id = `marker-${trip.id}`;
    // popup.getElement().id = `popup-${trip.id}`;
    this.markers[trip.id] = marker;
    this.addMarkerListeners(marker, trip);
  }

  addMarkerListeners(marker, trip) {
    const markerInfo = `<strong>${this.capitalize(
      trip.title
    )}</strong><p>Date: ${this.formatDate(trip.start_date)}</p><p>Distance: ${
      trip.distance && parseFloat(trip.distance) > 0
        ? `${trip.distance} Miles`
        : "N/A"
    }</p>`;

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 25,
    })
      .setLngLat(marker.getLngLat())
      .setHTML(markerInfo);

    marker.getElement().addEventListener("click", (e) => {
      const tripId = e.currentTarget.id.split("-")[1];
      window.location.href = `/trips/${tripId}`;
    });

    marker.getElement().addEventListener("mouseenter", (e) => {
      this.map.getCanvas().style.cursor = "pointer";
      e.currentTarget
        .getElementsByTagName("g")[2]
        .setAttribute("fill", "#4051b5");
      popup.addTo(this.map);
    });

    marker.getElement().addEventListener("mouseleave", (e) => {
      popup.remove();
      e.currentTarget
        .getElementsByTagName("g")[2]
        .setAttribute("fill", "#BC9CFF");
    });
  }

  removeMarker(marker, id) {
    delete this.markers[id];
    marker.remove();
  }
}
