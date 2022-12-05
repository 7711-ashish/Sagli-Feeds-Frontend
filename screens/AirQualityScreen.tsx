import {
    Text, View, TextInput, ImageBackground,
    StyleSheet, Dimensions
} from "react-native";
import React, { useState } from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import DropPM from '../components/DropPM';
import ShowDetails from '../components/ShowDetailsAir';
import ShowDetailsAir from "../components/ShowDetaislAirGases";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function AirQualityScreen() {
    
    const [details, setDetails] = useState('')

    const [pm, setpm] = useState();
    const [pmshow, setpmshow] = useState(false);

    
    const [gas, setgas] = useState('')
    const [gasShow, setgasShow] = useState(false)

    const handelDropDown1 = (val) => {
        console.log(val)
        setpm(val)
        setDetails("drop1")
        setpmshow(true)
    }

    //to handle select value of dropdown2
    const handelDropDown2 = (val) => {
        console.log(val)
        setgas(val)
        setDetails("drop2")
        setgasShow(true)
    }


    return (
        <View>
            <ImageBackground
                source={
                    require('../assets/airQualityBG.png')
                }
                resizeMode="stretch"
                style={styles.img}>

                 <DropPM
                        title="Particulate Matter"
                        handleSelect={handelDropDown1}
                    />
                    {pmshow && <ShowDetails details={details} pm={pm}  />}

                    <DropPM
                        title="Gases"
                        handleSelect={handelDropDown2}
                    />
                    {gasShow && <ShowDetailsAir data={details}  gases={gas} />}


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