export const formatDate = (dateString) => {
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
  const d = new Date();
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
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
  return (distance * 3.28084).toFixed();
};
