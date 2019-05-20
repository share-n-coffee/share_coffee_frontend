const PREDEFINED_TOPIC = {
  title: "a topic title",
  description: "",
  weekDay: "2",
  date: new Date().toJSON().substring(0, 10),
  time: "18:00",
  place: "some place",
  isRegular: true,
  location: {
    x: 0,
    y: 0,
  },
};

export default PREDEFINED_TOPIC;
