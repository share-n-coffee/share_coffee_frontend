import { WEEK_DAYS_NAMES } from "./WeekPicker/constants";

function getWeekDayName(weekDay) {
  const day = WEEK_DAYS_NAMES[weekDay];
  if (day !== undefined) {
    return day.name;
  }
  return undefined;
}

function isValidUnixTime(timeStamp) {
  const time = new Date(timeStamp).getTime();
  return !Number.isNaN(time) && Number.isFinite(time);
}

function timeDDMMYYYY(timeStamp) {
  if (!isValidUnixTime(timeStamp)) {
    return "";
  }
  const prependWithNull = value => (value < 10 ? `0${value}` : `${value}`);

  const time = new Date(timeStamp);
  const day = prependWithNull(time.getDate());
  const month = prependWithNull(time.getMonth() + 1);
  const year = time.getFullYear();

  const result = `${day}.${month}.${year}`;
  return result;
}

function convertToString(value) {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  return "";
}

function twoFieldsWithSeparator(value1, value2, separator) {
  const first = convertToString(value1);
  const second = convertToString(value2);

  if (!first && !second) {
    return "";
  }

  if (!first) {
    return second;
  }

  if (!second) {
    return first;
  }

  return `${first}${separator}${second}`;
}

export function location(locationArray) {
  if (!locationArray || !Array.isArray(locationArray)) {
    return "";
  }
  return twoFieldsWithSeparator(locationArray[0], locationArray[1], ", ");
}

export function periodicTime(weekDay, time) {
  const dayName = getWeekDayName(weekDay);
  return twoFieldsWithSeparator(dayName, time, ", ");
}

export function singleTime(singleDate, time) {
  const date = timeDDMMYYYY(singleDate);
  return twoFieldsWithSeparator(date, time, " – ");
}
