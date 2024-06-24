// Helper function to convert date string to Date object
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date object
};

export function dateDiffrenceInDays(duDate, remDate) {
  // Convert the date strings to Date objects
  const dueDate = parseDate(duDate);
  const remainderDate = parseDate(remDate);

  // Calculate the time difference in milliseconds
  const timeDiff = dueDate - remainderDate;

  // Convert the time difference from milliseconds to days
  const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

  return dayDiff;
}
