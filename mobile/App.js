import React, { createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TemperatureScreen from './screens/TemperatureScreen';
import HumidityScreen from './screens/HumidityScreen';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import useFetchReadings from './hooks/useFetchReadings';

export const DataContext = createContext();

const Stack = createStackNavigator();

export default function App() {
  const url = 'https://airlytcs-backend.onrender.com:5000/readings';
  const { data, averageTemp, medianTemp, averageHumidity, medianHumidity } =
    useFetchReadings(url);

  return (
    <DataContext.Provider
      value={{
        data,
        averageTemp,
        medianTemp,
        averageHumidity,
        medianHumidity,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Temperature" component={TemperatureScreen} />
          <Stack.Screen name="Humidity" component={HumidityScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataContext.Provider>
  );
}
