module.exports = function getNextTuesdayDateObject(date = new Date()) {
  const nextTuesday = new Date();
  nextTuesday.setDate(date.getDate() + ((2 - date.getDay() + 7) % 7));
  return nextTuesday;
};
