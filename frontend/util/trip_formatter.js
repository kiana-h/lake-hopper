export const formatDate = (dateString) => {
  const date = getDate(dateString).toDateString();
  return date.substr(4);
};

export const formatNumberComma = (x) => {
  x = typeof x === "number" ? x.toString() : x;
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
};

export const capitalize = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const today = () => {
  return new Date().toISOString().split("T")[0];
  // const d = new Date();
  // let month = "" + (d.getMonth() + 1);
  // let day = "" + d.getDate();
  // let year = d.getFullYear();

  // if (month.length < 2) month = "0" + month;
  // if (day.length < 2) day = "0" + day;

  // return [year, month, day].join("-");
};

export const getTripInfo = (rawTrip) => {
  let trip = { ...rawTrip };
  let activities = trip.activities;
  let distance = 0;
  let elevationGain = 0;
  let hr = 0;
  let activeTime = 0;
  let calories = 0;
  let i = 0;
  for (let activity of activities) {
    distance += activity.distance;
    elevationGain += activity.elevation_gain;
    if (activity.avg_hr) {
      hr += activity.avg_hr;
    }
    if (activity.calories) {
      calories += activity.calories;
    }
    if (activity.duration) {
      activeTime += activity.duration;
    }
    i++;
  }

  const timeDiff =
    getDate(trip.end_date).getTime() - getDate(trip.start_date).getTime();
  trip.days = (timeDiff / (1000 * 3600 * 24) + 1).toFixed();
  // trip.distance = (distance * 0.000621371).toFixed(2);
  // trip.elevationGain = (elevationGain * 3.28084).toFixed();
  trip.hr = hr > 0 ? (hr / i).toFixed() : null;
  trip.calories = calories > 0 ? calories : null;
  trip.activeTime =
    activeTime > 0
      ? new Date(activeTime * 1000).toISOString().substr(11, 8)
      : null;
  return trip;
};

export const getDistanceSum = (activities) => {
  let distance = 0;
  for (let activity of activities) {
    distance += activity.distance;
  }
  return (distance * 0.000621371).toFixed(2);
};

export const getElevationSum = (activities) => {
  let elevationGain = 0;
  for (let activity of activities) {
    elevationGain += activity.elevation_gain;
  }
  return (elevationGain * 3.28084).toFixed();
};

export const getDate = (date) => {
  const dateSplit = date.split("-");
  const dateJoin = [dateSplit[1], dateSplit[2], dateSplit[0]].join("-");
  return new Date(dateJoin);
};

export const dateRange = (trip) => {
  const start = formatDate(trip.start_date);
  const end = formatDate(trip.end_date);
  const dateString = start === end ? start : start + " - " + end;
  return dateString;
};
