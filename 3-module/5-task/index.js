function getMinMax(str) {
  const numbers = str.split(" ").filter((item) => item == +item);
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}
