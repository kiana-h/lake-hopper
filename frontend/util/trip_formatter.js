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
  debugger;
  x = typeof x === "number" ? x.toString() : x;
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
};

export const capitalize = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};
