export const convertNumber = (number) => {
  if (number === 1000) {
    return "1K";
  }
  if (number === 1000000) {
    return "1M";
  }
  if (number === 1000000000) {
    return "1B";
  }
  return number;
};
