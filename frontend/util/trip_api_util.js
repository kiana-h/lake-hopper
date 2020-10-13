export const fetchTrips = (data) => {
  return $.ajax({
    method: "GET",
    url: "/api/trips",
    data,
    error: (err) => console.log(err),
  });
};

export const fetchTrip = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/trips/${id}`,
    error: (err) => console.log(err),
  });
};

export const postTrip = (trip) => {
  return $.ajax({
    method: "POST",
    url: "/api/trips",
    data: home,
    contentType: false,
    processData: false,
  });
};
