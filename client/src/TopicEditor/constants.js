const PLACEHOLDERS = {
  location: "Coordinates",
  address: "Place",
  time: "Time",
  title: "Topic Title",
};

const DEFAULT_COORDINATES = [0, 0];
const COORDINATES_SEP = ", ";

const CYCLIC = [
  {
    name: "periodic",
    value: true,
    label: "Periodic",
  },
  {
    name: "single",
    value: false,
    label: "Single",
  },
];

export { PLACEHOLDERS, COORDINATES_SEP, DEFAULT_COORDINATES, CYCLIC };
