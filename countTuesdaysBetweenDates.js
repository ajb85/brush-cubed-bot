module.exports = function countTuesdaysBetweenDates(startDate, endDate) {
  const daysDifference = Math.floor((endDate - startDate) / (24 * 3600 * 1000));
  const tuesdaysCount = Math.floor(daysDifference / 7);

  return (
    tuesdaysCount + (startDate.getDay() <= 2 && endDate.getDay() >= 2 ? 1 : 0)
  );
};
