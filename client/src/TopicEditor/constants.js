const PREDEFINED_TOPIC = {
  title: "",
  description: "",
  weekDay: "",
  date: "",
  time: "",
  place: "",
  isRegular: null,
  location: [],
};

const PLACEHOLDERS = {
  location: "Coordinates",
  place: "Place",
  time: "Time",
  title: "Topic Title",
};

const DEFAULT_COORDINATES = [0, 0];
const COORDINATES_SEP = ", ";

const REGULARITY = {
  periodic: "true",
  single: "false",
};

export {
  PREDEFINED_TOPIC,
  PLACEHOLDERS,
  COORDINATES_SEP,
  DEFAULT_COORDINATES,
  REGULARITY,
};
