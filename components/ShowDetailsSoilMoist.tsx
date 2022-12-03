import {
    Text, View,
    StyleSheet, 
  } from "react-native"
  import { TouchableOpacity } from "react-native-gesture-handler";
  import React, { useEffect, useState } from 'react';
  
  export default function ShowDetailsSoilMoist(props) {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [soilMoist, setSoilMoist] = useState('0');
    // console.log(data);


    useEffect(() => {
      fetch(`https://zeet-backend-backend-7711-ashish.onrender.com/api/meto_hourly/soil/moist`)
        .then((response) => response.json())
        .then((json) => {
          setData(json)
          if(props.moistdepth=="0-1"){
            setSoilMoist(json.soil_moisture_0_1cm)
          }
          else if(props.moistdepth=="1-3"){
            setSoilMoist(json.soil_moisture_1_3cm)
          }
          else if(props.moistdepth=="3-9"){
            setSoilMoist(json.soil_moisture_3_9cm)
          }
          else if(props.moistdepth=="9-27"){
            setSoilMoist(json.soil_moisture_9_27cm)
          }
          else if(props.moistdepth=="27-81"){
            setSoilMoist(json.soil_moisture_27_81cm)
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
                        2022-12-01{"\n"}{"\n"}
                        Soil Moisture: {soilMoist} m³
                        {/* {props.details}
                        {props.tempdepth} */}
                        
                    </Text>
                </TouchableOpacity>
        </View>
    )
  }
  
  
  const styles = StyleSheet.create({
  
    text: {
      height: 180,
      margin: 15,
      padding: 30,
      paddingBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 30,
      marginTop: 20,
      marginBottom: 10,
      fontWeight: 'bold',
      fontSize: 20,
  },
  })