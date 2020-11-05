export const selectTrips = (state) => {
  return Object.values(state.entities.trips).reverse();
};

export const selectTrip = (state, tripId) => {
  let trip = state.entities.trips[tripId];
  if (trip && trip.activities) {
    let parsedTrackpoints;
    let activities = trip.activities.map((activity) => {
      parsedTrackpoints = JSON.parse(activity.trackpoints);
      activity.trackpoints = parsedTrackpoints;
      return activity;
    });
    trip.activities = activities;
  }
  return trip;
};
