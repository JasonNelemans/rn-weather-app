import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Utils
import { colors } from '../utils/index';

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;

export default function WeatherDetails() {
  return (
    <View style={styles.WeatherDetails}>
      <Text>Hi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  WeatherDetails: {
    marginTop: 'auto',
    margin: 15,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 10,
  },
});
