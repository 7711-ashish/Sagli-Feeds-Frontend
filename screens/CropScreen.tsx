import {
    Text, View, TextInput, ImageBackground,
    StyleSheet, Dimensions
} from "react-native";
import React, { useState } from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import Dropdown_Crop from '../components/Crop_Dropdown';
import ShowCropDetails from '../components/ShowCropDetails';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function CropScreen() {
    //to show the details component
    const [show, setShow] = useState(false);
    //to set the details of showdetails component
    const [details, setDetails] = useState('')
    const [crop, setCrop] = useState('');
    const [year, setYear] = useState('');
    const [season, setSeason] = useState('');




    //to handle select value of dropdown1
    const handelDropDown = (val) => {
        console.log(val)
        setDetails("drop1")
        if(val.type=='year')
        {
            setYear(val.value);
            if(crop!=''&&season!='')
            {
                console.log("calling API");
                setShow(true)
            }
        }
        else if(val.type=='Season')
        {
            setSeason(val.value);
            if(year!=''&&crop!='')
            {
                console.log("calling API");
                setShow(true)
            }
        }
        else
        {
            setCrop(val.value);
            if(year!=''&&season!='')
            {
                console.log("calling API");
                setShow(true)
            }
        }
        
       
        //console.log(color1);
        
    }


    return (
        <View>
            <ImageBackground
                source={
                    require('../assets/wheat2.jpeg')
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
                    <Dropdown_Crop
                        title="year"
                        handleSelect={handelDropDown}
                    />
                    <Dropdown_Crop
                        title="Season"
                        handleSelect={handelDropDown}
                    />
                    <Dropdown_Crop
                        title="Crops"
                        handleSelect={handelDropDown}
                    />
                    {show && <ShowCropDetails data={[year,season,crop]} />}
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