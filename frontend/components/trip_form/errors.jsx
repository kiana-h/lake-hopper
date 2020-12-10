export const noTripLocation = () => {
  this.props.receiveTripErrors(
    this.props.mode === "draw"
      ? [
          "Missing Trip Location Info:",
          "  - Draw your route on the map, or",
          "  - Specify the starting point by clicking on the map",
        ]
      : [
          "Missing Trip Location Info:",
          "  - Upload a .tcx file to get trip info",
        ]
  );
};
export const noTitle = () => {
  this.props.receiveTripErrors(["Title can't be blank"]);
};
