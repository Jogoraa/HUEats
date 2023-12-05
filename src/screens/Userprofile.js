import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { colors, btn2 } from "../globals/style";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../Firebase/firebaseConfig";

const Userprofile = ({ navigation }) => {
  const [userloggeduid, setUserloggeduid] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [edit, setEdit] = useState(false);
  const [newname, setNewName] = useState("");
  const [newaddress, setNewAddress] = useState("");
  const [Passwordedit, setPasswordedit] = useState(false);
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

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

  useEffect(() => {
    getuserdata();
  }, [userloggeduid]);

  const updateuser = async () => {
    const docRef = firebase
      .firestore()
      .collection("UserData")
      .where("uid", "==", userloggeduid);
    const doc = await docRef.get();
    if (!doc.empty) {
      if (newname !== "") {
        doc.forEach((doc) => {
          doc.ref.update({
            name: newname,
          });
        });
      }
      if (newaddress !== "") {
        doc.forEach((doc) => {
          doc.ref.update({
            address: newaddress,
          });
        });
      }
      alert("your user data is updated");
      getuserdata();
      setEdit(false);
      setPasswordedit(false);
    } else {
      console.log("no user data");
    }
  };

  const updatepassword = async () => {
    const reauthenticate = (oldpassword) => {
      var user = firebase.auth().currentUser;
      var cred = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldpassword
      );
      return user.reauthenticateWithCredential(cred);
    };
    let docRef = firebase
      .firestore()
      .collection("UserData")
      .where("uid", "==", userloggeduid);
    let doc = await docRef.get();
    reauthenticate(oldpassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(newpassword)
          .then(() => {
            if (!doc.empty) {
              doc.forEach((doc) => {
                doc.ref.update({
                  password: newpassword,
                });
              });
              alert("your password is updated");
            }
          })
          .catch((error) => {
            alert("Server Issue");
          });
      })
      .catch((error) => {
        alert("Wrong Password");
      });
  };

  const logoutuser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert("you are logged out");
        navigation.navigate("login");
      })
      .catch((error) => {
        alert("Server Issue");
      });
  };

  const pickImage = async () => {
    try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            // Use the "assets" array to access selected assets
            const selectedAsset = result.assets ? result.assets[0] : null;

            if (selectedAsset) {
                // Access the URI from the selected asset
                const selectedUri = selectedAsset.uri;

                setProfileImage(selectedUri);
            } else {
                alert('Error: Selected asset is undefined.');
            }
        } else {
            alert('Image picking was cancelled.');
        }
    } catch (error) {
        console.error('Error picking image:', error.message);
        alert('An error occurred while picking the image. Please try again.');
    }
};


  

  const updateProfilePicture = async () => {
    if (profileImage) {
      const storageRef = firebase.storage().ref().child(`profileImages/${userloggeduid}`);
  
      // Convert the image URI to a Blob
      const response = await fetch(profileImage);
      const blob = await response.blob();
  
      // Upload the Blob to Firebase Storage
      await storageRef.put(blob);
  
      // Get the download URL of the uploaded image
      const imageURL = await storageRef.getDownloadURL();
  
      // Update user data in Firestore with the imageURL
      const userDocRef = firebase.firestore().collection('UserData').doc(userloggeduid);
  
      // Ensure the document exists before updating
      const userDoc = await userDocRef.get();
      if (userDoc.exists) {
        await userDocRef.update({ profilePicture: imageURL });
  
        // Reload user data after updating
        getuserdata();
      } else {
        alert('User document not found.');
      }
    } else {
      alert('Please select an image before updating.');
    }
  };
  
  const submitImageToDatabase = async () => {
    try {
        if (profileImage) {
            console.log('Selected Profile Image:', profileImage);

            const storageRef = firebase.storage().ref().child(`profileImages/${userloggeduid}`);
            const response = await fetch(profileImage);
            const blob = await response.blob();

            await storageRef.put(blob);
            const imageURL = await storageRef.getDownloadURL();

            console.log('Image URL:', imageURL);

            const userDocRef = firebase.firestore().collection('UserData').doc(userloggeduid);

            const userDoc = await userDocRef.get();
            if (userDoc.exists) {
                await userDocRef.update({ profilePicture: imageURL });

                getuserdata();
            } else {
                alert('User document not found.');
            }
        } else {
            alert('Please select an image before submitting.');
        }
    } catch (error) {
        console.error('Error submitting image:', error.message);
        alert('An error occurred while submitting the image. Please try again.');
    }
};



  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("home")}>
        <View style={styles.navContainer}>
          <AntDesign
            name="back"
            size={24}
            color="black"
            style={styles.navIcon}
          />
        </View>
      </TouchableOpacity>

      {edit == false && Passwordedit == false && (
        <View style={styles.container}>
          <Text style={styles.head1}>Your Profile</Text>
          <View style={styles.containerin}>
            <Text style={styles.head2}>
              Name:{" "}
              {userdata ? (
                <Text style={styles.head2in}>{userdata.name}</Text>
              ) : (
                "loading"
              )}
            </Text>

            <Text style={styles.head2}>
              Email:{" "}
              {userdata ? (
                <Text style={styles.head2in}>{userdata.email}</Text>
              ) : (
                "loading"
              )}
            </Text>

            <Text style={styles.head2}>
              Phone:{" "}
              {userdata ? (
                <Text style={styles.head2in}>{userdata.phone}</Text>
              ) : (
                "loading"
              )}
            </Text>

            <Text style={styles.head2}>
              Address:{" "}
              {userdata ? (
                <Text style={styles.head2in}>{userdata.address}</Text>
              ) : (
                "loading"
              )}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setEdit(!edit);
              setPasswordedit(false);
            }}
          >
            <View style={btn2}>
              <Text style={styles.btntxt}>Edit Details</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setPasswordedit(!Passwordedit);
              setEdit(false);
            }}
          >
            <View style={btn2}>
              <Text style={styles.btntxt}>Change Password</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {edit == true && (
        <View style={styles.container}>
          <Text style={styles.head1}>Edit Profile</Text>
          <View style={styles.containerin}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={(e) => setNewName(e)}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              onChangeText={(e) => setNewAddress(e)}
            />
          </View>
          <TouchableOpacity onPress={() => updateuser()}>
            <View style={btn2}>
              <Text style={styles.btntxt}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {Passwordedit == true && (
        <View style={styles.container}>
          <Text style={styles.head1}>Change your Password</Text>
          <View style={styles.containerin}>
            <TextInput
              style={styles.input}
              placeholder="Old Password"
              onChangeText={(e) => setOldPassword(e)}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              onChangeText={(e) => setNewPassword(e)}
            />
          </View>
          <TouchableOpacity onPress={() => updatepassword()}>
            <View style={btn2}>
              <Text style={styles.btntxt}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

     
      {/* Profile picture section */}
      <View style={styles.container}>
        <Text style={styles.head1}>Profile Picture</Text>
        <View style={styles.containerin}>
          <TouchableOpacity onPress={pickImage}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Text style={styles.noImageText}>No Image Selected</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={updateProfilePicture}>
            <View style={btn2}>
              <Text style={styles.btntxt}>Update Profile Picture</Text>
            </View>
          </TouchableOpacity>

          {/* New button for submitting image */}
          {profileImage && (
            <TouchableOpacity onPress={submitImageToDatabase}>
              <View style={btn2}>
                <Text style={styles.btntxt}>Submit Image</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Logout button */}
      <TouchableOpacity onPress={() => logoutuser()}>
        <View style={btn2}>
          <Text style={styles.btntxt}>Logout</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};
// Export the component
export default Userprofile;
// Styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      width: '100%',
      padding: 20,
    },
    navContainer: {
      backgroundColor: '#eee',
      padding: 10,
    },
    navIcon: {
      alignSelf: 'flex-start',
    },
    head1: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
      textAlign: 'center',
    },
    profileContainer: {
      alignItems: 'center',
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginVertical: 10,
    },
    head2: {
      fontSize: 18,
      fontWeight: '500',
      marginVertical: 10,
      color: '#555',
    },
    containerin: {
      marginVertical: 20,
      alignItems: 'center',
    },
    input: {
      width: '100%',
      marginVertical: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    btn: {
      backgroundColor: '#4285f4',
      borderRadius: 10,
      marginVertical: 10,
      padding: 10,
      alignItems: 'center',
    },
    btnText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    noImageText: {
      fontSize: 16,
      marginTop: 10,
      color: '#777',
    },
  });
  
  
  