import {
    Text, View,
    StyleSheet,
} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { AsyncStorage } from 'react-native';
import * as Location from 'expo-location';


var today = new Date();

export default function ShowDetailsAir(props) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [gas, setgas] = useState('0');
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [date, setDate] = useState(today.toDateString())
  // console.log(data);

  const setcoords = async () => {
    let location = await Location.getCurrentPositionAsync({});
    let lat = location.coords.latitude
    let long = location.coords.longitude
    setlatitude(lat);
    setlongitude(long);
  }





  useEffect(() => {
    setcoords();
    console.log(props.gases);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lat: latitude,
        lon: longitude
      })
    };
    fetch(`https://sangli-feeds-backend.onrender.com/api/meto_hourly/airqality_gas`, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        setData(json)
        if (props.gases == 'nitrogen_dioxide') {
          setgas(json.nitrogen_dioxide)
        }
        else if (props.pm == 'carbon_monoxide') {
          setgas(json.carbon_monoxide)
        }
        else if (props.pm == 'sulphur_dioxide') {
            setgas(json.sulphur_dioxide)
        }
        else{
            setgas(json.ozone)
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [props]);



    return (
        <View>
            <TouchableOpacity>
                <Text style={styles.text}>
                    Scantime:
                    {date} {"\n"}{"\n"}
                    Gas percentage :  
                    {" "+gas}
                </Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({

    text: {
        height: 150,
        margin: 15,
        padding: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 30,
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 20,
    },
})