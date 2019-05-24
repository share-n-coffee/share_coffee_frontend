const PREDEFINED_TOPIC = {
  title: "some title",
  description: "",
  weekDay: "2",
  date: new Date().toJSON().substring(0, 10),
  time: "18:00",
  place: "some place",
  isRegular: null,
  // location: [-53.905535, 27.558799],
  location: null,
};

const PLACEHOLDERS = {
  title: "Topic Title",
  place: "Place",
  location: "Coordinates",
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
