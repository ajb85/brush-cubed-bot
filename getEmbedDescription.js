const getNextTuesdayDateObject = require("./getNextTuesdayDateObject");

module.exports = function getEmbedDescription() {
  const nextTuesday = getNextTuesdayDateObject();
  const year = nextTuesday.getFullYear().toString().slice(-2); // Get the last two digits of the year
  const month = String(nextTuesday.getMonth() + 1).padStart(2, "0"); // Add 1 to the month (months are 0-based) and ensure it's 2 digits
  const day = String(nextTuesday.getDate()).padStart(2, "0"); // Ensure the day is 2 digits

  return `Date: ${month}/${day}/${year}`;
};
