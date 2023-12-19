import React, { useState } from 'react'
import { Statusbar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { titles, colors, btn1, hr80 } from '../globals/style'
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { firebase } from '../../Firebase/firebaseConfig'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';

const DriverLogin = ({ navigation }) => {
    const [usernamefocus, setUsernamefocus] = useState(false);
    const [passwordfocus, setPasswordfocus] = useState(false);
    const [showpassword, setShowpassword] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [customerror, setcustomError] = useState('');

    const handlelogin = () => {
        // Assuming that username is actually an email address
        firebase.auth().signInWithEmailAndPassword(username, password)
            .then((userCredential) => {
                // Signed in
                // var user = userCredential.user;
                // console.log(user);
                // ...
    
                navigation.navigate('DriverDashboard');
            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
    
                if (errorMessage.includes('auth/invalid-email')) {
                    setcustomError('Please enter a valid email address');
                } else {
                    setcustomError('Incorrect email or password');

                }

            });
    };
    


    return (
        <View style={styles.container}>
            {/* <Statusbar /> */}
            <Text style={styles.head1}>Driver Login</Text>
            {customerror !== '' && <Text style={styles.errormsg}>{customerror}</Text>}
            <View style={styles.inputout}>
                <AntDesign name="user" size={24} color={usernamefocus === true ? colors.text1 : colors.text2} />
                <TextInput style={styles.input} placeholder="Email" onFocus={() => {
                    setUsernamefocus(true)
                    setPasswordfocus(false)
                    setShowpassword(false)
                    setcustomError('')
                }}
                    onChangeText={(text) => setUsername(text)}
                />
            </View>
            <View style={styles.inputout}>
                <MaterialCommunityIcons name="lock-outline" size={24} color={passwordfocus == true ? colors.text1 : colors.text2} />
                <TextInput style={styles.input} placeholder="Password" onFocus={() => {
                    setUsernamefocus(false)
                    setPasswordfocus(true)
                    setcustomError('')
                }}

                    secureTextEntry={showpassword === false ? true : false}
                    onChangeText={(text) => setPassword(text)}
                />

                <Octicons name={showpassword == false ? "eye-closed" : "eye"} size={24} color="black" onPress={() => setShowpassword(!showpassword)} />
            </View>
            <TouchableOpacity style={btn1} onPress={() => handlelogin()}>
                <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Sign in</Text>
            </TouchableOpacity>

<Text style={styles.forgot} onPress={() => navigation.navigate('forgotpassword')}>
        Forgot Password?
      </Text>
            <Text style={styles.or}>OR</Text>
            <Text style={styles.gftxt}>Sign In With </Text>


            <View style={styles.gf}>
                <TouchableOpacity>
                    <View style={styles.gficon}>
                        <AntDesign name="google" size={24} color="#EA4335" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.gficon}>
                        <FontAwesome5 name="facebook-f" size={24} color="#4267B2" /></View>
                </TouchableOpacity>
            </View>
            <View style={hr80}></View>
            <Text >Don't have an account?
                <Text style={styles.signup} onPress={() => navigation.navigate('driversignup')}> Sign Up</Text>
            </Text>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    head1: {
        fontSize: titles.title1,
        color: colors.text1,
        textAlign: 'center',
        marginVertical: 10,
    },
    inputout: {
        flexDirection: 'row',
        width: '80%',
        marginVertical: 10,
        backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        // alignSelf: 'center',
        elevation: 20,
    },
    input: {
        fontSize: 18,
        marginLeft: 10,
        width: '80%',
    },
    forgot: {
        color: colors.text2,
        marginTop: 20,
        marginBottom: 10,
    },
    or: {
        color: colors.text1,
        marginVertical: 10,
        fontWeight: 'bold',
    },
    gftxt: {
        color: colors.text2,
        marginVertical: 10,
        fontSize: 25,
    },
    gf: {
        flexDirection: 'row'
    },
    gficon: {
        backgroundColor: 'white',
        width: 50,
        margin: 10,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        elevation: 20,
    },
    signup: {
        color: colors.text1,
    },
    errormsg: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,  
        zIndex: 1,
      },
  

})

export default DriverLogin