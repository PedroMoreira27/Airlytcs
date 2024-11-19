import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-gifted-charts';
import { DataContext } from '../App';

export default function HumidityScreen({ navigation }) {
  const { data, averageHumidity, medianHumidity } = useContext(DataContext);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={[styles.textContainer, { backgroundColor: '#E0F7FA', borderColor: 'deepskyblue' }]}>
          <Text style={styles.text}>Media Humidade: {averageHumidity}%</Text>
        </View>
        <View style={[styles.textContainer, { backgroundColor: '#E0F7FA', borderColor: 'deepskyblue' }]}>
          <Text style={styles.text}>Humidade Mediana: {medianHumidity}%</Text>
        </View>


        <Text style={styles.title}>Humidade pelo tempo</Text>
        <LineChart
          data={data.map((item, index) => ({
            value: item.humidity,
            label: `H${index + 1}`,
          }))}
          height={200}
          color="deepskyblue"
          lineThickness={2}
        />

        <Text style={styles.title}>Humidade deviante padrão</Text>
        <BarChart
          data={[{ value: 11.79, color: 'deepskyblue' }]}
          height={150}
          barWidth={30}
        />

        <View style={styles.buttons}>
          <Button 
            style={styles.button}
            title="Temperatura"
            onPress={() => navigation.navigate('Temperature')}
          />
          <Button
            style={styles.button}
            title="Home"
            onPress={() => navigation.navigate('Home')}
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
    backgroundColor: '#E0F7FA',
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
  button: {
    backgroundColor: 'black',
    borderRadius: 8, 
  },
  text: { fontSize: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
});
