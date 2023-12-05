import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ProgressBarAndroid,
  Alert,
} from 'react-native';
import WebView from 'react-native-webview';

const AwardProjectScreen = ({ route, navigation }) => {
  const [isPaymentLoading, setPaymentLoading] = useState(false);

  const {
    itemId,
    deliveryDate,
    proposalDescription,
    price,
    userId2,
  } = route.params;

  const [txRef, setTxRef] = useState('');

  const awardProject = async () => {
    // Your award project logic here
    // ...

    Alert.alert('Project Awarded', 'Project has been awarded successfully.', [
      { text: 'Ok', onPress: () => navigation.navigate('Main') },
    ]);
  };

  const initializePayment = async () => {
    try {
      setPaymentLoading(true);

      // Your initialize payment logic here
      // ...

      // Simulate a successful response for demonstration
      const checkoutUrl = 'https://example.com/checkout';
      setTxRef(txRef);

      // Redirect the user to the payment link using WebView
      navigation.navigate('PaymentWebView', {
        urlPayment: checkoutUrl,
        txRef,
        onPaymentComplete: handlePaymentComplete,
      });
    } catch (error) {
      console.error('Error initializing payment:', error);
      Alert.alert('An error occurred. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const handlePaymentComplete = (paymentState) => {
    if (paymentState) {
      Alert.alert('Payment successful');
      // Perform any additional actions upon successful payment
    } else {
      Alert.alert('Payment failed');
    }
  };

  return (
    <View>
      {/* Your UI components here */}
      <Text>Project Award Screen</Text>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>

      <Button
        title={isPaymentLoading ? 'Loading...' : 'Award Project'}
        onPress={isPaymentLoading ? null : awardProject}
      />

      <Button
        title={isPaymentLoading ? 'Loading...' : 'Initialize Payment'}
        onPress={initializePayment}
      />

      {isPaymentLoading && <ProgressBarAndroid styleAttr="Large" />}

      {/* Additional UI components */}
    </View>
  );
};

export default AwardProjectScreen;
