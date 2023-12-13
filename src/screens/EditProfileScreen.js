import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeadNav from '../components/HomeHeadNav'
import { navbtn, navbtnin } from '../globals/style'
import { AntDesign } from '@expo/vector-icons';
import { colors, btn2, titles } from '../globals/style';

import { firebase } from '../../Firebase/firebaseConfig';
const EditProfileScreen = ({ navigation }) => {
    const [userloggeduid, setUserloggeduid] = useState(null);
    const [userdata, setUserdata] = useState(null);

    useEffect(() => {
        const checklogin = () => {
            firebase.auth().onAuthStateChanged((user) => {
                // console.log(user);
                if (user) {
                    // navigation.navigate('home');
                    setUserloggeduid(user.uid);
                } else {
                    // No user is signed in.
                    console.log('no user');
                }
            });
        }
        checklogin();
    }, [])

    // console.log(userloggeduid);

    const getuserdata = async () => {
        const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
        const doc = await docRef.get();
        if (!doc.empty) {
            doc.forEach((doc) => {
                setUserdata(doc.data());
            })
        }
        else {
            console.log('no user data');
        }
    }

    useEffect(() => {

        getuserdata();
    }, [userloggeduid]);

    // console.log(userdata);


    const [edit, setEdit] = useState(false);
    const [newname, setNewName] = useState('');
    const [newaddress, setNewAddress] = useState('');


    const updateuser = async () => {
        const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
        const doc = await docRef.get();
        if (!doc.empty) {
            if (newname !== '') {
                doc.forEach((doc) => {
                    doc.ref.update({
                        name: newname
                    })
                })
            }
            if (newaddress !== '') {
                doc.forEach((doc) => {
                    doc.ref.update({
                        address: newaddress
                    })
                })
            }
            alert('your user data is updated');
            getuserdata();
            setEdit(false);
            setPasswordedit(false);
        }
        else {
            console.log('no user data');
        }
    }


    const [Passwordedit, setPasswordedit] = useState(false);
    const [oldpassword, setOldPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');


    const updatepassword = async () => {
        const reauthenticate = (oldpassword) => {
            var user = firebase.auth().currentUser;
            var cred = firebase.auth.EmailAuthProvider.credential(
                user.email, oldpassword);
            return user.reauthenticateWithCredential(cred);
        }
        let docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
        let doc = await docRef.get();
        reauthenticate(oldpassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(newpassword).then(() => {
                // alert("Password updated!");

                if (!doc.empty) {
                    doc.forEach((doc) => {
                        doc.ref.update({
                            password: newpassword
                        })
                    })
                    alert('your password is updated');
                }
            }).catch((error) => { alert('Server Issue'); });
        }).catch((error) => { alert('Wrong Password'); });
    }


    const logoutuser = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            alert('you are logged out');
            navigation.navigate('login');
        }).catch((error) => {
            // An error happened.
            alert('Server Issue');
        });
    }
    return (
        <View style={styles.containerout}>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <View style={navbtn}>
                    <AntDesign name="back" size={24} color="black" style={navbtnin} />
                </View>
            </TouchableOpacity>
            {edit == false && Passwordedit == false && <View style={styles.container}>
                <Text style={styles.head1}>Your Profile</Text>
                <View style={styles.containerin}>
                    <Text style={styles.head2}>Name: {userdata ? <Text style={styles.head2in}>
                        {userdata.name}
                    </Text> : 'loading'}</Text>

                    <Text style={styles.head2}>Email: {userdata ? <Text style={styles.head2in}>
                        {userdata.email}
                    </Text> : 'loading'}</Text>

                    <Text style={styles.head2}>Phone: {userdata ? <Text style={styles.head2in}>
                        {userdata.phone}
                    </Text> : 'loading'}</Text>

                    <Text style={styles.head2}>Address: {userdata ? <Text style={styles.head2in}>
                        {userdata.address}
                    </Text> : 'loading'}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    setEdit(!edit)
                    setPasswordedit(false)
                }}>
                    <View style={btn2}>
                        <Text style={styles.btntxt}>Edit Details</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setPasswordedit(!Passwordedit)
                    setEdit(false)
                }
                }>
                    <View style={btn2}>
                        <Text style={styles.btntxt}>Change Password</Text>
                    </View>
                </TouchableOpacity>
            </View>
            }
            {edit == true && (
                <View style={styles.container}>
                    <Text style={styles.head1}>Edit Your Profile</Text>
                    <View style={styles.containerin}>
                        <TextInput style={styles.input} placeholder='Name' onChangeText={(e) => setNewName(e)} />
                        <TextInput style={styles.input} placeholder='Address' onChangeText={(e) => setNewAddress(e)} />
                    </View>

                    <TouchableOpacity onPress={() => updateuser()}>
                        <View style={btn2}>
                            <Text style={styles.btntxt}>Update</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}

            {Passwordedit == true && (
                <View style={styles.container}>
                    <Text style={styles.head1}>Change your Password</Text>
                    <View style={styles.containerin}>
                        <TextInput style={styles.input} placeholder='Old Password' onChangeText={(e) => setOldPassword(e)} />
                        <TextInput style={styles.input} placeholder='New Password' onChangeText={(e) => setNewPassword(e)} />
                    </View>

                    <TouchableOpacity onPress={() => updatepassword()}>
                        <View style={btn2}>
                            <Text style={styles.btntxt}>Update</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}

            <TouchableOpacity onPress={() => logoutuser()}>
                <View style={btn2}>
                    <Text style={styles.btntxt}>Logout</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default EditProfileScreen

const styles = StyleSheet.create({
  containerout: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    paddingTop: 20, // Move inner screens to the top by adding paddingTop
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  head1: {
    fontSize: 40,
    fontWeight: 'bold', // Change to bold for more emphasis
    marginVertical: 20,
    color: colors.primary, // Use a color variable for consistency
    textAlign: 'center', // Center the text
  },
  containerin: {
    width: '90%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 15, // Increase border radius for a softer look
    padding: 20,
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Add a slight background opacity
  },
  head2: {
    fontSize: 20,
    fontWeight: 'bold', // Change to bold for more emphasis
    marginTop: 20,
    color: colors.secondary, // Use a color variable for consistency
  },
  head2in: {
    fontSize: 20,
    fontWeight: '300',
    color: colors.text2, // Use a color variable for consistency
  },
  inputout: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 15, // Increase padding for better spacing
    paddingVertical: 12, // Increase padding for better spacing
    elevation: 5, // Slight elevation for a card-like effect
    alignItems: 'center', // Align items for better aesthetics
  },
  btntxt: {
    fontSize: 18, // Slightly reduce font size
    fontWeight: 'bold', // Change to bold for more emphasis
    color: '#fff',
    textAlign: 'center',
    padding: 12, // Increase padding for better touch area
  },
  input: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    elevation: 5,
    color: colors.text2, // Use a color variable for consistency
  },
  btn2: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
    elevation: 5,
  },
  
})