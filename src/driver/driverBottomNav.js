

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../globals/style';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';  // Import the correct icon

const DriverBottomNav = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* <Text>BottomNav</Text> */}
            <View style={styles.btncon1}>
                <AntDesign name="home" size={30} color="black" style={styles.icon1} onPress={() => { navigation.navigate('DriverDashboard') }} />

            </View>
            <View style={styles.btncon2} >
                <Ionicons name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'} size={30} color="black" style={styles.icon2} onPress={() => { navigation.navigate('search') }} />
            </View>
            <View style={styles.btncon1} >
                <FontAwesome5 name="cart-plus" size={30} color="black" style={styles.icon1} onPress={() => { navigation.navigate('cart') }} />

            </View>
            <View style={styles.btncon1} >
                <FontAwesome5 name="map-marked-alt" size={30} color="black" style={styles.icon1} onPress={() => { navigation.navigate('map') }} />
            </View>
            <View style={styles.btncon1} >
            <FontAwesome5 name="cog" size={30} color="black" style={styles.icon1} onPress={() => { navigation.navigate('settings') }} />
            </View>
        </View>
        
    )
}
export default DriverBottomNav

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        elevation: 30,
        borderTopColor: colors.text1,
        borderTopWidth: 0.5,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    },
    btncon1: {
        alignItems: 'center',
    },
    btncon2: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: -20,
        backgroundColor: colors.text1,
        width: 50,
        height: 50,
        borderRadius: 60,
    },
    icon2: {
        color: 'white',
    },
    icon1: {
        color: colors.text1,
    },
});