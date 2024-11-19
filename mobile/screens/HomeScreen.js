import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { DataContext } from '../App';

export default function HomeScreen({ navigation }) {
  const { data, averageTemp, medianTemp, averageHumidity, medianHumidity } =
    useContext(DataContext);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Temperatura */}
        <View
          style={[
            styles.summaryContainer,
            { backgroundColor: '#FFF3E0', borderColor: 'tomato' },
          ]}
        >
          <Text style={styles.title}>Temperature Summary</Text>
          <Text style={styles.text}>Average: {averageTemp}°C</Text>
          <Text style={styles.text}>Median: {medianTemp}°C</Text>
          <LineChart
            data={data.map((item, index) => ({
              value: item.temperature,
              label: `T${index + 1}`,
            }))}
            height={150}
            color="tomato"
            lineThickness={2}
          />
          <Button
            title="Detalhes"
            onPress={() => navigation.navigate('Temperature')}
          />
        </View>

        {/* Umidade */}
        <View
          style={[
            styles.summaryContainer,
            { backgroundColor: '#E0F7FA', borderColor: 'deepskyblue' },
          ]}
        >
          <Text style={styles.title}>Humidity Summary</Text>
          <Text style={styles.text}>Average: {averageHumidity}%</Text>
          <Text style={styles.text}>Median: {medianHumidity}%</Text>
          <LineChart
            data={data.map((item, index) => ({
              value: item.humidity,
              label: `H${index + 1}`,
            }))}
            height={150}
            color="deepskyblue"
            lineThickness={2}
          />
          <Button
            title="Detalhes"
            onPress={() => navigation.navigate('Humidity')}
          />
        </View>
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
  summaryContainer: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    width: '90%',
  },
  text: { fontSize: 16, marginVertical: 4 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
});
