export const getDate = (obj) => {
  const date = new Date(obj); // Create a Date object from the date string
  const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if necessary
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (zero-based index) and pad with leading zero if necessary
  const year = date.getFullYear(); // Get full year (4 digits)
  return `${day}/${month}/${year}`;
};
