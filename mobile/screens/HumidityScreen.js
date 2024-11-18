import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-gifted-charts';
import { DataContext } from '../App';

export default function HumidityScreen({ navigation }) {
  const { data, averageHumidity, medianHumidity } = useContext(DataContext);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Average Humidity: {averageHumidity}%</Text>
        <Text style={styles.text}>Median Humidity: {medianHumidity}%</Text>

        <Text style={styles.title}>Humidity Over Time</Text>
        <LineChart
          data={data.map((item, index) => ({
            value: item.humidity,
            label: `H${index + 1}`
          }))}
          height={200}
          color="deepskyblue"
          lineThickness={2}
        />

        <Text style={styles.title}>Humidity Standard Deviation</Text>
        <BarChart
          data={[{ value: 11.79, label: 'SD', color: 'blue' }]} 
          height={150}
          barWidth={30}
        />

        <Text style={styles.text}>Skewness: -0.76</Text>
        <Text style={styles.text}>Kurtosis: 5.32</Text>

        <Button
          title="Go to Temperature"
          onPress={() => navigation.navigate('Temperature')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { padding: 16 },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: { fontSize: 16, marginVertical: 4 },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
});
