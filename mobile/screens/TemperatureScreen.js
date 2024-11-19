import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-gifted-charts';
import { DataContext } from '../App';

export default function TemperatureScreen({ navigation }) {
  const { data, averageTemp, medianTemp } = useContext(DataContext);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={[styles.textContainer, { backgroundColor: '#FFF3E0', borderColor: 'tomato' }]}>
          <Text style={styles.text}>Media Temperatura: {averageTemp}°C</Text>
        </View>
        <View style={[styles.textContainer, { backgroundColor: '#FFF3E0', borderColor: 'tomato' }]}>
          <Text style={styles.text}>Temperatura Mediana: {medianTemp}°C</Text>
        </View>

        <Text style={styles.title}>Temperatura pelo tempo</Text>
        <LineChart
          data={data.map((item, index) => ({
            value: item.temperature,
            label: `T${index + 1}`,
          }))}
          height={200}
          color="tomato"
          lineThickness={2}
        />

        <Text style={styles.title}>Temperatura deviante padrão</Text>
        <BarChart
          data={[{ value: 2.86, color: 'tomato' }]}
          height={150}
          barWidth={30}
        />
        <View style={[styles.buttons]}>
          <Button title="Humidade" onPress={() => navigation.navigate('Humidity')} />
          <Button title="Home" onPress={() => navigation.navigate('Home')} />
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
    backgroundColor: '#FFF3E0',
  },
  textContainer: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    marginVertical: 4,
    width: '90%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginTop: 16,
  },
  text: { fontSize: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
});
