const PLACEHOLDERS = {
  location: "Coordinates",
  address: "Place",
  time: "Time",
  title: "Topic Title",
  weekDay: "Week Day",
  date: "Date",
};

const DEFAULT_COORDINATES = [0, 0];

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

export { PLACEHOLDERS, DEFAULT_COORDINATES, CYCLIC };
