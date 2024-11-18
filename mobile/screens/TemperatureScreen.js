import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-gifted-charts';
import { DataContext } from '../App';

export default function TemperatureScreen({ navigation }) {
  const { data, averageTemp, medianTemp } = useContext(DataContext);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Average Temperature: {averageTemp}°C</Text>
        <Text style={styles.text}>Median Temperature: {medianTemp}°C</Text>
        
        <Text style={styles.title}>Temperature Over Time</Text>
        <LineChart
          data={data.map((item, index) => ({
            value: item.temperature,
            label: `T${index + 1}`
          }))}
          height={200}
          color="tomato"
          lineThickness={2}
        />

        <Text style={styles.title}>Temperature Standard Deviation</Text>
        <BarChart
          data={[{ value: 2.86, label: 'SD', color: 'orange' }]}
          height={150}
          barWidth={30}
        />

        <Text style={styles.text}>Skewness: -7.32</Text>
        <Text style={styles.text}>Kurtosis: 68.72</Text>

        <Button title="Go to Humidity" onPress={() => navigation.navigate('Humidity')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { padding: 16 },
  container: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  text: { fontSize: 16, marginVertical: 4 },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
});
