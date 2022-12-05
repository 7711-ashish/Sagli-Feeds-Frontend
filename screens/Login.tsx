import React, { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native';
import { Text, View, TextInput, Dimensions, StyleSheet, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native'
import Colors from '../constants/color'
import * as Location from 'expo-location';

const screenHeight = Dimensions.get('window').height + 30;
const screenWidth = Dimensions.get('window').width;

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('user', value)
      
    } catch (e) {
      // saving error
    }
  }



  useEffect(() => {
    (async () => {
      try{
        const use = await AsyncStorage.getItem('user')
        let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      setEmail('');
      setPass('');
      let location = await Location.getCurrentPositionAsync({});
      let latitude = location.coords.latitude
      let longitude = location.coords.longitude
      await AsyncStorage.setItem('latitude',latitude.toString());
      await AsyncStorage.setItem('longitude',longitude.toString());
      setLocation(location);
        if(use){
          props.navigation.navigate('DrawerNavigator');
        }
      }catch{}
      
    })();
  }, []);

  // const onCLick=async()=>{

  //   const response = await fetch('https://zeet-backend-backend-7711-ashish.onrender.com/api/userReg')
  // }


  const clickLogin = async () => {


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      username: email,
      password: pass })
  };


    fetch('https://sangli-feeds-backend.onrender.com/api/userReg/login',requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.message = "Login Success") {
          alert('You are logged in.');
          storeData(result.user);
          console.log(result.user)
          global.loc = location
          console.log(global.loc)
          props.navigation.navigate('DrawerNavigator');
        } else {
          alert('Please check your login information.');
        }
      }).catch(err => console.log(err));
  }



  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
    Alert.alert(
      "Alert Title",
      text,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  return (
    <ImageBackground
      source={
        require('../assets/signup.jpeg')
      }
      resizeMode="stretch"
      style={styles.img}>
      <View style={styles.container}>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#888"
            onChangeText={(text) => { setEmail(text) }}
            value={email}
          />
        </View>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#888"
            onChangeText={(text) => { setPass(text) }}
            value={pass}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            clickLogin()
            // 
          }}
        >
          <Text style={{ ...styles.loginText, color: 'white' }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('SignUp');
          }}
        >
          <Text style={styles.loginText}>Signup</Text>
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