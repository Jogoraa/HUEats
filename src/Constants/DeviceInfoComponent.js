import React from 'react';
import { View, Text } from 'react-native';
import Constants from 'expo-constants';

const DeviceInfoComponent = () => {
  const deviceId = Constants.deviceId;
  const platform = Constants.platform;
  const appVersion = Constants.nativeAppVersion;
  const deviceName = Constants.deviceName;
  const statusBarHeight = Constants.statusBarHeight;

  return (
    <View>
      <Text>Device ID: {deviceId}</Text>
      <Text>Platform: {platform}</Text>
      <Text>App Version: {appVersion}</Text>
      <Text>Device Name: {deviceName}</Text>
      <Text>Status Bar Height: {statusBarHeight}</Text>
      {/* Add more device-specific information as needed */}
    </View>
  );
};

export default DeviceInfoComponent;
