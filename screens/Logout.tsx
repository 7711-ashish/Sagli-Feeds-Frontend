import React, { useState } from 'react'
import { Text, View, TextInput, Dimensions, StyleSheet, TouchableOpacity, Image, ImageBackground, AsyncStorage } from 'react-native'
import Colors from '../constants/color'

const screenHeight = Dimensions.get('window').height + 30;
const screenWidth = Dimensions.get('window').width;

export default function Signup(props) {

    const click = async(e) => {


        try{

            await AsyncStorage.clear();
        }catch(err){
            
        }
        props.navigation.navigate('Login')
    }





    return (
        <ImageBackground
            source={
                require('../assets/signup.jpeg')
            }
            resizeMode="stretch"
            style={styles.img}>
            <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={(e) => {
                            click(e)
                        }}
                    >
                        <Text style={{ ...styles.loginText, color: 'white' }}>Logout</Text>
                    </TouchableOpacity>
            </View>
        </ImageBackground>

    )
}


const styles = StyleSheet.create({
    img: {
        height: screenHeight,
        width: screenWidth,

    },
    container: {
        flex: 1,
        // backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView: {
        width: "80%",
        backgroundColor: "rgba(255,255,255,0.6)",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        fontFamily: 'open-sans'
    },
    loginBtn: {
        width: "80%",
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 10
    },
    loginText: {
        fontFamily: 'open-sans',
        fontSize: 15,
    }
})