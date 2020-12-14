export const fetchTrips = (data) => {
  return $.ajax({
    method: "GET",
    url: "/api/trips",
    data,
    error: (err) => console.log,
  });
};

export const fetchTrip = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/trips/${id}`,
    error: (err) => console.log,
  });
};

export const postTrip = (trip) => {
  return $.ajax({
    method: "POST",
    url: "/api/trips",
    data: trip,
    contentType: false,
    processData: false,
  });
};
