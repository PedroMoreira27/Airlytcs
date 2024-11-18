export const calculateAverage = (array) => {
  const sum = array.reduce((acc, value) => acc + value, 0);
  return (sum / array.length).toFixed(2);
};

export const calculateMedian = (array) => {
  const sorted = array.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return (
    sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2
  ).toFixed(2);
};
