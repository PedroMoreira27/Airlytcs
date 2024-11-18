import { useState, useEffect } from 'react';
import { calculateAverage, calculateMedian } from '../utils/statistics';

const useFetchReadings = (url) => {
  const [data, setData] = useState([]);
  const [averageTemp, setAverageTemp] = useState(0);
  const [medianTemp, setMedianTemp] = useState(0);
  const [averageHumidity, setAverageHumidity] = useState(0);
  const [medianHumidity, setMedianHumidity] = useState(0);

  useEffect(() => {
    const getAPI = async () => {
      try {
        let response = await fetch(url);
        let result = await response.json();

        let filteredData = [];
        let lastTimestamp = 0;

        result.forEach((item) => {
          const timestamp = new Date(item.timestamp).getTime();
          if (timestamp >= lastTimestamp + 5 * 60 * 1000) {
            filteredData.push(item);
            lastTimestamp = timestamp;
          }
        });

        setData(filteredData || []);

        if (filteredData.length > 0) {
          const temperatures = filteredData.map((item) => item.temperature);
          const humidities = filteredData.map((item) => item.humidity);

          setAverageTemp(calculateAverage(temperatures));
          setMedianTemp(calculateMedian(temperatures));
          setAverageHumidity(calculateAverage(humidities));
          setMedianHumidity(calculateMedian(humidities));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getAPI();
  }, [url]);

  return { data, averageTemp, medianTemp, averageHumidity, medianHumidity };
};

export default useFetchReadings;
