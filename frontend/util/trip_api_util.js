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
    // dataType: "json",
    // data: JSON.stringify(trip),
    data: trip,
    contentType: false,
    processData: false,
  });

  // return fetch("/api/trips", {
  //   method: "POST",
  //   body: trip,
  // });

  // return fetch("/api/trips", { method: "POST", body: trip }).then((res) =>
  //   console.log(res)
  // );
};
