import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
import { collection, getDocs, query, doc, updateDoc } from "firebase/firestore";
import { firebase } from '../../Firebase/firebaseConfig';
import OrderDetailsModal from './OrderDetailsModal';
import DriverBottomNav from './driverBottomNav';  // Assuming your file name is DriverBottomNav.js

const MemoizedOrderItem = React.memo(({ item, onPress, onAcceptOrder }) => {
  return (
    <TouchableOpacity
      style={styles.orderItemContainer}
      onPress={() => onPress(item)}
    >
      <View style={styles.orderItemInfo}>
        <Text style={styles.orderItemText}>Order #{item.orderid}</Text>
        <Text>Status: {item.orderstatus}</Text>
      </View>
      <Button
        title="Accept Order"
        onPress={() => onAcceptOrder(item.id)}
        titleStyle={styles.acceptButtonText}
        buttonStyle={styles.acceptButton}
      />
    </TouchableOpacity>
  );
});

const DriverDashboard = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(firebase.firestore(), 'UserOrders'));
        const querySnapshot = await getDocs(q);

        const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const renderOrderItem = ({ item }) => {
    return (
      <MemoizedOrderItem
        item={item}
        onPress={handleOrderPress}
        onAcceptOrder={handleAcceptOrder}
      />
    );
  };

  const handleOrderPress = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      const orderDocRef = doc(firebase.firestore(), 'UserOrders', orderId);
      await updateDoc(orderDocRef, { orderstatus: 'Accepted' });
      // You can perform additional actions after accepting the order if needed
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Driver Dashboard</Text>
      <Text style={styles.sectionTitle}>Assigned Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderid.toString()}
        renderItem={renderOrderItem}
        style={styles.orderList}
      />

      <OrderDetailsModal
        isVisible={isModalVisible}
        order={selectedOrder}
        onClose={closeModal}
      />
      
      <DriverBottomNav navigation={navigation} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderList: {
    width: '100%',
  },
  orderItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  orderItemInfo: {
    flex: 1,
  },
  acceptButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  acceptButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default DriverDashboard;
