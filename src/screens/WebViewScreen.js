import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const WebViewScreen = ({ route }) => {
  const { htmlContent } = route.params;

  return (
    <View style={styles.container}>
      <WebView source={{ html: htmlContent }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewScreen;
