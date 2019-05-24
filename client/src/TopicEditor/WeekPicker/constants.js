const WEEK_DAYS = {
  monday: "0",
  tuesday: "1",
  wednesday: "2",
  thursday: "3",
  friday: "4",
  saturday: "5",
  sunday: "6",
};

const WEEK_DAYS_NAMES = {
  [WEEK_DAYS.monday]: {
    name: "monday",
    abbr: "Mon",
  },
  [WEEK_DAYS.tuesday]: {
    name: "tuesday",
    abbr: "Tue",
  },
  [WEEK_DAYS.wednesday]: {
    name: "wednesday",
    abbr: "Wed",
  },
  [WEEK_DAYS.thursday]: {
    name: "thursday",
    abbr: "Thu",
  },
  [WEEK_DAYS.friday]: {
    name: "friday",
    abbr: "Fri",
  },
  [WEEK_DAYS.saturday]: {
    name: "saturday",
    abbr: "Sat",
  },
  [WEEK_DAYS.sunday]: {
    name: "sunday",
    abbr: "Sun",
  },
};

const WEEK = [
  WEEK_DAYS.sunday,
  WEEK_DAYS.monday,
  WEEK_DAYS.tuesday,
  WEEK_DAYS.wednesday,
  WEEK_DAYS.thursday,
  WEEK_DAYS.friday,
  WEEK_DAYS.saturday,
];

const WEEK_PICKER_TITLE = "Repeat every:";

export { WEEK_DAYS, WEEK_DAYS_NAMES, WEEK, WEEK_PICKER_TITLE };
