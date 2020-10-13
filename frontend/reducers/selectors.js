export const selectTrips = (state) => {
  return Object.values(state.entities.trips);
};
