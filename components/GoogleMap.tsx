import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import MapView, { Camera, Marker } from 'react-native-maps';

interface GoogleMapProps {
  finish: string;
  time: number;
  route: { start: [number, number]; finish: [number, number] };
}

const GoogleMap: React.FC<GoogleMapProps> = ({ finish, route }) => {
  return (
    <MapView
      style={styles.map}
      minZoomLevel={14}
      initialRegion={{
        latitude: route.finish[0],
        longitude: route.finish[1],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      <Marker
        coordinate={{
          latitude: route.finish[0],
          longitude: route.finish[1],
        }}
        title={finish}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 270,
    marginBottom: 20,
  },
});

export default GoogleMap;
