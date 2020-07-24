import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

// Api
const WEATHER_API_KEY = '4c0b773edf1b12fe8be246a59f64a0b2';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

// Components
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import ReloadIcon from './components/ReloadIcon';

// Utils
import { colors } from './utils/index';

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');

  useEffect(() => {
    load();
  }, [unitsSystem]);

  async function load() {
    setCurrentWeather(null); // Set to null to catch potential error.
    setErrorMessage(null); // And also to activate load screen.
    try {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        setErrorMessage('Access to location is needed to run the app.');
        return;
      }
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(weatherUrl);

      const result = await response.json();

      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(error.messsage);
    }
  }

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <View style={styles.main}>
          <UnitsPicker
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style='auto' />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={colors.PRIMARY_COLOR} />
        <StatusBar style='auto' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  },
});
