import {
  Text, View,
  StyleSheet, 
} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useEffect, useState } from 'react';

var today = new Date();

export default function ShowDetails(props) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [soiltemp, setSoilTemp] = useState('0');
  const [date, setDate] = useState(today.toDateString())
  // console.log(data);


  useEffect(() => {

    let lat = global.loc.coords.latitude
    let long = global.loc.coords.longitude

    fetch(`https://sangli-feeds-backend.onrender.com/api/meto_hourly/soil/${lat}/${long}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json)
        if(props.tempdepth==0){
          
          setSoilTemp(json.soil_temperature_0cm)
        }
        else if(props.tempdepth==6){
          
          setSoilTemp(json.soil_temperature_6cm)
        }
        else if(props.tempdepth==18){
          
          setSoilTemp(json.soil_temperature_18cm)
        }
        else if(props.tempdepth==54){
          
          setSoilTemp(json.soil_temperature_54cm)
        }
        
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [props]);
  // console.log(data)

  return (
      <View>
              <TouchableOpacity>
                  <Text style={styles.text}>

                        Scantime:{"\n"}
                        {date} {"\n"}{"\n"}
                      Soil Temperature: {soiltemp} °C
                      {/* {props.details}
                      {props.tempdepth} */}
                      
                  </Text>
              </TouchableOpacity>
      </View>
  )
}


const styles = StyleSheet.create({

  text: {
      height: 150,
      margin: 10,
      padding: 30,
      paddingBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 30,
      // marginTop: 20,
      // marginBottom: 10,
      fontWeight: 'bold',
      fontSize: 20,
  },
})