export function isValidPhoneNumber(data) {
  // Check if the input is a string and exactly 10 characters long
  if (typeof data !== "string" || data.length !== 10) {
    return false;
  }

  // Check if every character in the string is a digit (0-9)
  for (let i = 0; i < data.length; i++) {
    if (data[i] < "0" || data[i] > "9") {
      return false; // Found a non-digit character
    }
  }

  // If all characters are digits and the length is exactly 10, return true
  return true;
}
