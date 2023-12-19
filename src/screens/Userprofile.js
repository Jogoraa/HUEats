import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colors, btn2 } from '../globals/style';
import { firebase } from '../../Firebase/firebaseConfig';

const Userprofile = ({ navigation }) => {
    const [userloggeduid, setUserloggeduid] = useState(null);
    const [userdata, setUserdata] = useState(null);
    const [edit, setEdit] = useState(false);
    const [newname, setNewName] = useState('');
    const [newaddress, setNewAddress] = useState('');

    const [Passwordedit, setPasswordedit] = useState(false);
    const [oldpassword, setOldPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);

    useEffect(() => {
        const checklogin = () => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    setUserloggeduid(user.uid);
                } else {
                    console.log('no user');
                }
            });
        };
        checklogin();
    }, []);

    const getuserdata = async () => {
        const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid);
        const doc = await docRef.get();
        if (!doc.empty) {
            doc.forEach((doc) => {
                setUserdata(doc.data());
            });
        } else {
            console.log('no user data');
        }
    };

    useEffect(() => {
        getuserdata();
    }, [userloggeduid]);

    const updateuser = async () => {
        const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid);
        const doc = await docRef.get();
        if (!doc.empty) {
            if (newname !== '') {
                doc.forEach((doc) => {
                    doc.ref.update({
                        name: newname,
                    });
                });
            }
            if (newaddress !== '') {
                doc.forEach((doc) => {
                    doc.ref.update({
                        address: newaddress,
                    });
                });
            }
            alert('Your user data is updated');
            getuserdata();
            setEdit(false);
            setPasswordedit(false);
            setEditModalVisible(false);
        } else {
            console.log('no user data');
        }
    };

    const updatepassword = async () => {
        const reauthenticate = (oldpassword) => {
            var user = firebase.auth().currentUser;
            var cred = firebase.auth.EmailAuthProvider.credential(user.email, oldpassword);
            return user.reauthenticateWithCredential(cred);
        };

        try {
            await reauthenticate(oldpassword);

            var user = firebase.auth().currentUser;
            await user.updatePassword(newpassword);

            let docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid);
            let doc = await docRef.get();

            if (!doc.empty) {
                doc.forEach((doc) => {
                    doc.ref.update({
                        password: newpassword,
                    });
                });
                alert('Your password is updated');
            }
        } catch (error) {
            console.error("Error during reauthentication:", error.message);
            alert('Error updating password: ' + error.message);
        }
    };

    const logoutuser = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                alert('You are logged out');
                navigation.navigate('login');
            })
            .catch(() => {
                alert('Server Issue');
            });
    };

    const openEditModal = () => {
        setEditModalVisible(true);
    };

    const closeEditModal = () => {
        setEditModalVisible(false);
    };

    const openPasswordModal = () => {
        setPasswordModalVisible(true);
    };

    const closePasswordModal = () => {
        setPasswordModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <View style={styles.navBtn}>
                    <AntDesign name="back" size={24} color="black" />
                </View>
            </TouchableOpacity>

            {edit === false && Passwordedit === false && (
                <View style={styles.container}>
                    <Text style={styles.head1}>Your Profile</Text>
                    <View style={styles.containerInner}>
                        <Text style={styles.head2}>Name: {userdata ? <Text style={styles.head2In}>{userdata.name}</Text> : 'loading'}</Text>
                        <Text style={styles.head2}>Email: {userdata ? <Text style={styles.head2In}>{userdata.email}</Text> : 'loading'}</Text>
                        <Text style={styles.head2}>Phone: {userdata ? <Text style={styles.head2In}>{userdata.phone}</Text> : 'loading'}</Text>
                        <Text style={styles.head2}>Address: {userdata ? <Text style={styles.head2In}>{userdata.address}</Text> : 'loading'}</Text>
                    </View>
                    <TouchableOpacity onPress={openEditModal}>
                        <View style={btn2}>
                            <Text style={styles.buttonText}>Edit Details</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={openPasswordModal}>
                        <View style={btn2}>
                            <Text style={styles.buttonText}>Change Password</Text>
                        </View>
                    </TouchableOpacity>

                    <Modal animationType="slide" transparent={true} visible={editModalVisible} onRequestClose={closeEditModal}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.head1}>Edit Your Profile</Text>
                                <View style={styles.containerInner}>
                                    <TextInput style={styles.input} placeholder="Name" onChangeText={(e) => setNewName(e)} />
                                    <TextInput style={styles.input} placeholder="Address" onChangeText={(e) => setNewAddress(e)} />
                                </View>

                                <TouchableOpacity onPress={updateuser}>
                                    <View style={btn2}>
                                        <Text style={styles.buttonText}>Update</Text>
                                    </View>
                                </TouchableOpacity>

                                <Pressable style={styles.cancelButton} onPress={closeEditModal}>
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                    <Modal animationType="slide" transparent={true} visible={passwordModalVisible} onRequestClose={closePasswordModal}>
                        <View style={styles.passwordModalContainer}>
                            <View style={styles.passwordModalContent}>
                                <Text style={styles.head1}>Change Password</Text>
                                <View style={styles.containerInner}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Old Password"
                                        secureTextEntry={true}
                                        onChangeText={(e) => setOldPassword(e)}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="New Password"
                                        secureTextEntry={true}
                                        onChangeText={(e) => setNewPassword(e)}
                                    />
                                </View>

                                <TouchableOpacity onPress={updatepassword}>
                                    <View style={btn2}>
                                        <Text style={styles.buttonText}>Update Password</Text>
                                    </View>
                                </TouchableOpacity>

                                <Pressable style={styles.cancelButton} onPress={closePasswordModal}>
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
            )}
        </View>
    );
};

export default Userprofile;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        paddingHorizontal: 20,
    },
    navBtn: {
        position: 'absolute',
        top: 10,
        left: 20,
        zIndex: 1,
    },
    containerInner: {
        width: '90%',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 15,
        padding: 20,
        marginTop: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    head2In: {
        fontSize: 20,
        fontWeight: '300',
        color: colors.text2,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        padding: 12,
    },
    cancelButton: {
        marginTop: 10,
    },
    cancelButtonText: {
        color: colors.secondary,
        fontSize: 16,
        textAlign: 'center',
    },
    passwordModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    passwordModalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 5,
    },
});