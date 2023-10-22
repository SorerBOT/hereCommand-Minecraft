function removeColorFormatting(inputString) { // Use a regular expression to match color codes (§x) and remove them
  const strippedString = inputString.replace(/§[0-9a-fklmnor]/g, '');
  return strippedString;
}

export default removeColorFormatting;
