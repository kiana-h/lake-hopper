export const selectTrips = (state) => {
  let trips = Object.values(state.entities.trips).reverse();
  for (let trip of trips) {
    if (trip && trip.activities) {
      trip.distance = (
        trip.activities.reduce((sum, activity) => {
          return activity.distance + sum;
        }, 0) * 0.000621371
      ).toFixed(2);
      trip.elevationGain = (
        trip.activities.reduce((sum, activity) => {
          return activity.elevation_gain + sum;
        }, 0) * 3.28084
      ).toFixed();
    }
  }
  return trips;
};

export const selectTrip = (state, tripId) => {
  let trip = state.entities.trips[tripId];
  debugger;
  if (trip && trip.activities.length && trip.activities[0].trackpoints) {
    debugger;
    let parsedTrackpoints;
    console.log(trip.activities[0].trackpoints);
    let activities = trip.activities.map((activity) => {
      parsedTrackpoints = JSON.parse(activity.trackpoints);
      activity.trackpoints = parsedTrackpoints;
      return activity;
    });
    trip.activities = activities;
    trip.distance = (
      trip.activities.reduce((sum, activity) => {
        return activity.distance + sum;
      }, 0) * 0.000621371
    ).toFixed(2);
    trip.elevationGain = (
      trip.activities.reduce((sum, activity) => {
        return activity.elevation_gain + sum;
      }, 0) * 3.28084
    ).toFixed();
  }
  return trip;
};
