import {
    Text, View, TextInput, ImageBackground,
    StyleSheet, Dimensions
} from "react-native";
import React, { useState } from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import Dropdown_soil from '../components/Dropdown';
import ShowDetails from '../components/ShowDetails';
import ShowDetailsSoilMoist from '../components/ShowDetailsSoilMoist';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function SoilMoistureScreen() {
    //to show the details component
    const [tempshow, setTempShow] = useState(false);
    const [moistshow, setMoistShow] = useState(false);
    //to set the details of showdetails component
    const [details, setDetails] = useState('')

    const [moistdepth, setMoistdepth] = useState('')
    const [tempdepth, setTempdepth] = useState('')

    //to handle select value of dropdown1
    const handelDropDown1 = (val) => {
        console.log(val)
        setTempdepth(val)
        setDetails("drop1")
        setTempShow(true)
    }

    //to handle select value of dropdown2
    const handelDropDown2 = (val) => {
        console.log(val)
        setMoistdepth(val)
        setDetails("drop2")
        setMoistShow(true)
    }


    return (
        <View>
            <ImageBackground
                source={
                    require('../assets/SoilMoistureBackground.jpg')
                }
                resizeMode="stretch"
                style={styles.img}>
                    {/* <Text style={styles.text}>
                        Scantime:{"\n"}
                        2022-07-24 08:48:11 {"\n"}{"\n"}
                        Soil Temperature:
                        24.2499938964843 {"\n"}{"\n"}
                        Soil Moisture: 29
                    </Text> */}
                    <Dropdown_soil
                        title="Soil Temperatue"
                        handleSelect={handelDropDown1}
                    />
                    

                    {setTempShow && <ShowDetails details={details} tempdepth={tempdepth}  />}

                    <Dropdown_soil
                        title="Soil Moisture"
                        handleSelect={handelDropDown2}
                    />
                    {setMoistShow && <ShowDetailsSoilMoist data={details} moistdepth={moistdepth}/>}

            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    img: {
        height: screenHeight,
        width: screenWidth,

    },
    text: {
        height: 250,
        margin: 15,
        padding: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 30,
        marginTop: 80,
        fontWeight: 'bold',
        fontSize: 20,
    },
})