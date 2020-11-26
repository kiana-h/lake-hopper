export const fetchActivities = (data) => {
  return $.ajax({
    method: "GET",
    url: "/api/activities",
    data,
    error: (err) => console.log(err),
  });
};

export const fetchActivity = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/activities/${id}`,
    error: (err) => console.log(err),
  });
};

export const postActivities = (activities) => {
  return $.ajax({
    method: "POST",
    url: "/api/activities",
    data: activities,
    // contentType: false,
    // processData: false,
  });
};
