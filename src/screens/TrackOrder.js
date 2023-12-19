import React, { useEffect, useState } from 'react';
import {
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';

import HomeHeadNav from '../components/HomeHeadNav';
import BottomNav from '../components/BottomNav';
import { firebase } from '../../Firebase/firebaseConfig';

const TrackOrders = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const fadeAnim = new Animated.Value(0);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const getOrders = async () => {
    const ordersRef = firebase
      .firestore()
      .collection('UserOrders')
      .where('orderuseruid', '==', firebase.auth().currentUser.uid);
    const snapshot = await ordersRef.get();
    const ordersData = snapshot.docs.map((doc) => doc.data());
    setOrders(ordersData);
    fadeIn();
  };

  useEffect(() => {
    getOrders();
  }, []);

  const convertDate = (date) => {
    const newDate = new Date(date.seconds * 1000);
    return newDate.toDateString();
  };

  const cancelOrder = async (orderItem) => {
    const orderRef = firebase.firestore().collection('UserOrders').doc(orderItem.orderid);
    await orderRef.update({
      orderstatus: 'cancelled',
    });
    getOrders();
  };

  const renderOrderItem = ({ item, index }) => (
    <View style={styles.order} key={index}>
      <Text style={styles.orderindex}>{index + 1}</Text>
      <Text style={styles.ordertxt2}>Order ID: {item.orderid}</Text>
      <Text style={styles.ordertxt2}>Order Date: {convertDate(item.orderdate)}</Text>
      {item.orderItems.map((orderItem, itemIndex) => (
        <View key={itemIndex}>
          <Text>{orderItem.itemName}</Text>
        </View>
      ))}
      <Text>Total Cost: {item.ordercost}</Text>
      {item.orderstatus === 'Delivered' && <Text>Thank you for ordering with us</Text>}
      {item.orderstatus === 'cancelled' && <Text>Sorry for the inconvenience</Text>}
      {item.orderstatus !== 'cancelled' && item.orderstatus !== 'delivered' && (
        <TouchableOpacity style={styles.cancelbtn} onPress={() => cancelOrder(item)}>
          <Text style={styles.cencelbtnin}>Cancel Order</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />
      <View >
        <BottomNav navigation={navigation} />
      </View>
      <FlatList
        style={[styles.container, { opacity: fadeAnim }]}
        data={orders}
        keyExtractor={(item) => item.orderid}
        renderItem={({ item, index }) => (
          <View style={styles.order} key={index}>
            <Text style={styles.orderindex}>{index + 1}</Text>
            <Text style={styles.ordertxt2}>Order ID: {item.orderid}</Text>
            <Text style={styles.ordertxt2}>Order Date: {convertDate(item.orderdate)}</Text>
            {item.orderItems.map((orderItem, itemIndex) => (
              <View key={itemIndex}>
                <Text>{orderItem.itemName}</Text>
              </View>
            ))}
            <Text>Total Cost: {item.ordercost}</Text>
            {item.orderstatus === 'Delivered' && <Text>Thank you for ordering with us</Text>}
            {item.orderstatus === 'cancelled' && <Text>Sorry for the inconvenience</Text>}
            {item.orderstatus !== 'cancelled' && item.orderstatus !== 'delivered' && (
              <TouchableOpacity style={styles.cancelbtn} onPress={() => cancelOrder(item)}>
                <Text style={styles.cencelbtnin}>Cancel Order</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </>
  );
}
  
  export default TrackOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    width: '100%',
    height: '100%',
  },
  bottomnav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.col1,
    zIndex: 20,
  },
  containerin: {
    marginTop: 10,
    flex: 1,
    backgroundColor: colors.col1,
    width: '100%',
    height: '100%',
    marginBottom: 100,
  },
  head1: {
    fontSize: 30,
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  rowout: {
    flexDirection: 'column',
    margin: 10,
    elevation: 10,
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
  },
  row1: {
    flexDirection: 'column',
    margin: 10,
    elevation: 10,
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qty: {
    fontSize: 20,
    color: colors.text1,
    marginRight: 10,
  },
  title: {
    fontSize: 17,
    color: colors.text1,
    marginRight: 10,
  },
  price1: {
    fontSize: 17,
    color: colors.text1,
    marginRight: 10,
  },
  totalprice: {
    fontSize: 20,
    marginRight: 10,
  },
  total: {
    fontSize: 20,
    color: colors.text3,
    textAlign: 'right',
    marginVertical: 10,
    marginRight: 20,
  },
  order: {
    margin: 10,
    elevation: 10,
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
  },
  ordertxt1: {
    fontSize: 20,
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 10,
  },
  ordertxt2: {
    fontSize: 17,
    color: colors.text3,
    textAlign: 'center',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  orderindex: {
    fontSize: 20,
    color: colors.col1,
    backgroundColor: colors.text1,
    textAlign: 'center',
    borderRadius: 30,
    padding: 5,
    width: 30,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  ordertxt3: {
    fontSize: 17,
    color: colors.text3,
    textAlign: 'center',
    marginVertical: 5,
    borderColor: colors.text1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  cancelbtn: {
    backgroundColor: colors.text1,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'center',
  },
  cencelbtnin: {
    fontSize: 20,
    color: colors.col1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  orderstatus: {},
  orderstatusin: {},
  orderotw: {
    fontSize: 20,
    backgroundColor: 'orange',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  orderdelivered: {
    fontSize: 20,
    backgroundColor: 'green',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  ordercancelled: {
    fontSize: 20,
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  orderpending: {
    fontSize: 20,
    backgroundColor: 'yellow',
    color: 'grey',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
});
