import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from "react-native"
import React, { useState, useEffect, useRef } from 'react'
import { ScrollView } from "react-native-gesture-handler";
// import CardFlip from 'react-native-card-flip';


export default function DamScreen() {
  const cardFlip = useRef();
  return (
    <ImageBackground
    source={
      require('../assets/signup.jpeg')
    }
    >
      <ScrollView>
        {/* <CardFlip style={styles.cardContainer} ref={cardFlip}> */}
        <Text style={[styles.textTitle]}>INFORMATION</Text>
        <Text style={styles.text}>Air temperature at 2 meters above ground</Text>
        <Text style={styles.text}>
          Relative humidity at 2 meters above ground
        </Text>
        <Text style={styles.text}>
          Weather condition as a numeric code. Follow WMO weather interpretation codes.
        </Text>
        <Text style={styles.text}>
          Temperature in the soil at 0, 6, 18 and 54 cm depths. 0 cm is the surface temperature on land or water surface temperature on water.
        </Text>
        <Text style={styles.text}>
          Average soil water content as volumetric mixing ratio at 0-1, 1-3, 3-9, 9-27 and 27-81 cm depths.
        </Text>
        <Text style={styles.text}>
          Atmospheric gases close to surface (10 meter above ground) values are in μg/m³(carbon_monoxide
          nitrogen_dioxide
          sulphur_dioxide
          ozone)
        </Text>
        <Text style={styles.text}>
          Particulate matter with diameter smaller than 10 µm (PM10) and smaller than 2.5 µm (PM2.5) close to surface (10 meter above ground) in μg/m³
        </Text>
        {/* </CardFlip> */}
      </ScrollView>
    </ImageBackground>

  )
}



const styles = StyleSheet.create({
  
  text: {
    margin: 15,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 30,
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 18,
  },
  textTitle: {
    height: 80,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 24,
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 25,
  },
})