import {
  Text, View,
  StyleSheet,
} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { AsyncStorage } from 'react-native';
import * as Location from 'expo-location';





var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
let hour = today.getHours();

export default function ShowDetailsAir(props) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pm, setpm] = useState('0');
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
    console.log(longitude);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lat: latitude,
        lon: longitude
      })
    };
    fetch(`https://sangli-feeds-backend.onrender.com/api/meto_hourly/airqality_pm`, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        // console.log(json)
        setData(json)
        if (props.pm == 'pm10') {
          setpm(json.pm10)
        }
        else if (props.pm == 'pm2_5') {
          setpm(json.pm2_5)
        }
      })
      // .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [props]);
  // console.log(data)




  return (
    <View>
      <TouchableOpacity>
        <Text style={styles.text}>
          Scantime:{" "}
          {date} {"\n"}{"\n"}
          Particulate Matter:
          {pm}
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