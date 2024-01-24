const countTuesdaysBetweenDates = require("./countTuesdaysBetweenDates");
const getNextTuesdayDateObject = require("./getNextTuesdayDateObject");

const users = [
  process.env.DISCORD_FIRE_ID,
  process.env.DISCORD_SHAM_ID,
  process.env.DISCORD_TYSON_ID,
];

module.exports = function getNextTurnUserId(date, skips = 0) {
  const nextTuesday = getNextTuesdayDateObject(date);
  const startDate = new Date(2024, 0, 2);
  const tuesdaysCount =
    countTuesdaysBetweenDates(startDate, nextTuesday) - 1 - skips;
  return users[tuesdaysCount % users.length];
};
