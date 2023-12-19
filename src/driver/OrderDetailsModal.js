import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const OrderDetailsModal = ({ isVisible, order, onClose, deliveryBoyId }) => {
  if (!isVisible || !order || order.deliveryboy_id !== deliveryBoyId) {
    return null;
  }

  const orderData = order.orderdata && order.orderdata.length > 0 ? order.orderdata[0] : {};

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => onClose()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Order Details:</Text>
            <Text>Order #{order.orderid}</Text>
            <Text>Status: {order.orderstatus}</Text>
            <Text>Name: {order.ordername}</Text>
            <Text>Phone: {order.orderphone}</Text>
            <Text>Address: {order.orderaddress}</Text>
            <Text>Cost: ${order.ordercost}</Text>
            <Button title="Close" onPress={() => onClose()} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  foodDetailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
});

export default OrderDetailsModal;
