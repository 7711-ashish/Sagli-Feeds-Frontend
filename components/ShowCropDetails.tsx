import {
    Text, View,
    StyleSheet, 
  } from "react-native"
  import { TouchableOpacity } from "react-native-gesture-handler";
  import React, { useEffect, useState } from 'react';
  
  export default function ShowCropDetails(props) {

    const [area, setArea] = useState('0');
    const [prod, setProd] = useState('0');

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    // console.log(data);
    console.log(area);
    console.log(prod);


  useEffect(() => {
    fetch(`https://sangli-feeds-backend.onrender.com/api/cropprod/${props.data[0]}/${props.data[1]}/${props.data[2]}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json)
        if(json.records.length>0){
          setArea(json.records[0].area_)
          setProd(json.records[0].production_)
        }
        else{
          setArea('0')
          setProd('0')
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [props]);

    return (
        <View>
                <TouchableOpacity>
                    <Text style={styles.text}>
                        {/* Scantime:{"\n"}{"\n"} */}
                        
                        
                        Area: {area}{"\n"}{"\n"}
                        
                        Production: {prod}{"\n"} 

                        {/* {props.data[0]}{"\n"} 
                         {props.data[1]}{"\n"} 
                         {props.data[2]} {"\n"} */}
                        
                    </Text>
                </TouchableOpacity>
        </View>
    )
  }
  
  
  const styles = StyleSheet.create({
  
    text: {
        height: 200,
        margin: 15,
        padding: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 30,
        marginTop: 40,
        fontWeight: 'bold',
        fontSize: 20,
    },
  })