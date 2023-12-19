import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { btn1, colors, hr80, navbtn, navbtnin } from "../globals/style";
import { firebase } from "../../Firebase/firebaseConfig";
import { AntDesign } from "@expo/vector-icons";

const Placeorder = ({ navigation, route }) => {
  const [orderdata, setOrderdata] = useState([]);
  const [totalCost, setTotalCost] = useState("0");
  const { cartdata } = route.params;
  useEffect(() => {
    setOrderdata(JSON.parse(cartdata));
  }, [cartdata]);

  const [userloggeduid, setUserloggeduid] = useState(null);
  const [userdata, setUserdata] = useState(null);
  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserloggeduid(user.uid);
        } else {
          console.log("no user");
        }
      });
    };
    checklogin();
  }, []);

  useEffect(() => {
    const getuserdata = async () => {
      const docRef = firebase
        .firestore()
        .collection("UserData")
        .where("uid", "==", userloggeduid);
      const doc = await docRef.get();
      if (!doc.empty) {
        doc.forEach((doc) => {
          setUserdata(doc.data());
        });
      } else {
        console.log("no user data");
      }
    };
    getuserdata();
  }, [userloggeduid]);

  useEffect(() => {
    if (cartdata != null) {
      const foodprice = JSON.parse(cartdata).cart;
      let totalfoodprice = 0;
      foodprice.map((item) => {
        totalfoodprice =
          parseInt(item.data.foodPrice) * parseInt(item.Foodquantity) +
          parseInt(item.data.foodAddonPrice) * parseInt(item.Addonquantity) +
          totalfoodprice;
      });
      setTotalCost(JSON.stringify(totalfoodprice));
    }
  }, [cartdata]);

  const placenow = () => {
    const docRef = firebase
      .firestore()
      .collection("UserOrders")
      .doc(new Date().getTime().toString());
    docRef.set({
      orderid: docRef.id,
      orderdata: orderdata.cart,
      orderstatus: "pending",
      ordercost: totalCost,
      orderdate: firebase.firestore.FieldValue.serverTimestamp(),
      orderaddress: userdata.address,
      orderphone: userdata.phone,
      ordername: userdata.name,
      orderuseruid: userloggeduid,
      orderpayment: "online",
      paymenttotal: totalCost,
    });

    // Constructing the Chapa HTML form content with dynamic values
    const htmlContent = `
    <html>
    <body onload="submitForm()">
      <form id="paymentForm" method="POST" action="https://api.chapa.co/v1/hosted/pay">
           <!-- Your input fields with dynamic values -->
           <input type="hidden" name="public_key" value="CHAPUBK_TEST-ivLOr82NLXZOW9JEksb6v1KEkb3nx34F" />
           <input type="hidden" name="tx_ref" value="HU-food-${new Date()
        .getTime()
        .toString()}" />
           <input type="hidden" name="amount" value="${totalCost}" />
           <input type="hidden" name="currency" value="ETB" />
           <input type="hidden" name="email" value="${userdata?.email}" />
           <input type="hidden" name="first_name" value="${userdata?.name}" />
           <input type="hidden" name="title" value="HU Food Order" />
           <input type="hidden" name="description" value="Paying with Confidence with cha" />
           <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
           <input type="hidden" name="callback_url" value="https://example.com/callbackurl" />
           <input type="hidden" name="return_url" value="https://example.com/returnurl" />
           <input type="hidden" name="meta[title]" value="test" />
           <button type="submit">Pay Now</button>
         </form>
         <script>
         function submitForm() {
           var form = document.getElementById("paymentForm");
           // Set the dynamic return_url here based on your logic
           form.elements["return_url"].value = "";
           form.submit();
         }
       </script>
       </body>
     </html>
   `;

    // Render the WebView with the HTML content
    navigation.navigate("WebViewScreen", { htmlContent });
  };
  return (
    <FlatList
      style={styles.containerout}
      data={[{ key: 'orderSummary' }]} // You can modify the data structure as needed
      renderItem={() => (
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("home")}>
            <View style={navbtn}>
              <AntDesign name="back" size={24} color="black" style={navbtnin} />
            </View>
          </TouchableOpacity>
          <View style={styles.container}>
            <Text style={styles.head1}>Your Order Summary</Text>
            <FlatList
              style={styles.c1}
              data={orderdata.cart}
              renderItem={({ item }) => {
                return (
                  <View style={styles.rowout}>
                    <View style={styles.row}>
                      <View style={styles.left}>
                        <Text style={styles.qty}>{item.Foodquantity}</Text>
                        <Text style={styles.title}>{item.data.foodName}</Text>
                        <Text style={styles.price1}>ETB {item.data.foodPrice}</Text>
                      </View>
                      <View style={styles.right}>
                        <Text style={styles.totalprice}>
                          ETB
                          {parseInt(item.Foodquantity) *
                            parseInt(item.data.foodPrice)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.row}>
                      <View style={styles.left}>
                        <Text style={styles.qty}>{item.Addonquantity}</Text>
                        <Text style={styles.title}>{item.data.foodAddon}</Text>
                        <Text style={styles.price1}>
                          ETB {item.data.foodAddonPrice}
                        </Text>
                      </View>
                      <View style={styles.right}>
                        <Text style={styles.totalprice}>
                          ETB
                          {parseInt(item.Addonquantity) *
                            parseInt(item.data.foodAddonPrice)}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
            <View style={hr80}></View>
            <View style={styles.row}>
              <View style={styles.left}>
                <Text style={styles.title}>Order Total :</Text>
              </View>
              <View style={styles.left}>
                <Text style={styles.totalprice}>ETB{totalCost}</Text>
              </View>
            </View>

            <View style={hr80}></View>

            <View style={styles.userdataout}>
              <Text style={styles.head1}>Your Details</Text>
              <View style={styles.row}>
                <View style={styles.left}>
                  <Text style={styles.title}>Name :</Text>
                </View>
                <View style={styles.right}>
                  <Text style={styles.title}>{userdata?.name}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.left}>
                  <Text style={styles.title}>Email :</Text>
                </View>
                <View style={styles.right}>
                  <Text style={styles.title}>{userdata?.email}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.left}>
                  <Text style={styles.title}>Phone :</Text>
                </View>

                <View style={styles.right}>
                  <Text style={styles.title}>{userdata?.phone}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.left}>
                  <Text style={styles.title}>Address :</Text>
                </View>
                <View style={styles.right}>
                  <Text style={styles.title}>{userdata?.address}</Text>
                </View>
              </View>
            </View>

            <View style={hr80}></View>

            <View>
              <TouchableOpacity style={btn1}>
                <Text style={styles.btntext} onPress={() => placenow()}>
                  Proceed to Payment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.key}
    />
  );
};

export default Placeorder;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  head1: {
    fontSize: 30,
    fontWeight: "200",
    color: colors.text1,
    margin: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "space-between",
  },
  rowout: {
    flexDirection: "column",
    margin: 10,
    elevation: 10,
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
  },

  qty: {
    width: 40,
    height: 30,
    backgroundColor: colors.text1,
    borderRadius: 10,
    textAlign: "center",
    textAlignVertical: "center",
    marginRight: 10,
    color: colors.col1,
    fontSize: 17,
    fontWeight: "bold",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 10,
  },
  price1: {
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 10,
    color: colors.text1,
  },
  left: {
    flexDirection: "row",
  },
  right: {
    flexDirection: "row",
  },
  totalprice: {
    fontSize: 17,
    fontWeight: "bold",
    borderColor: colors.text1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  btntext: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.col1,
    margin: 10,
  },
});
