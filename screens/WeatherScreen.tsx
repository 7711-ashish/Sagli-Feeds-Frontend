import { StyleSheet, View, Text, Image, Dimensions, FlatList, ScrollView, AsyncStorage } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Button } from '@rneui/themed';
import { useState, useRef, useEffect } from "react";


import color from "../constants/color";


import BottomSheet, { BottomSheetRefProps } from '../components/BottonSheet';
import { max } from "react-native-reanimated";
import * as Location from 'expo-location';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

let images = [
  'https://static.vecteezy.com/system/resources/previews/002/251/495/large_2x/taj-mahal-on-a-sunny-day-in-agra-uttar-pradesh-india-photo.jpg',
  'https://img.freepik.com/free-photo/high-angle-closeup-shot-isolated-green-leaf-puddle-rainy-day_181624-12619.jpg?auto=format&h=200',
  'https://newsus.cgtn.com/news/3567544d79596a4d3363544f77596a4d34637a4e31457a6333566d54/img/59c9a396656c414480e9950dc39b9b2b/59c9a396656c414480e9950dc39b9b2b.JPG',
  'https://www.collegesearch.in/upload/institute/images/small/190430124850_walchand.jpg'
]



export default function Weather() {

  // const [tempUnit , setTempUnit] = useState('°C');
  const ctempUnit = '°C';
  const ftempUnit = '°f';
  const [ctemp, setTemp] = useState();
  const [ftemp, setFtemp] = useState();
  const [relativehumidity_2m, setrelativehumidity_2m] = useState();
  const [minTemp, setMintemp] = useState();
  const [maxTemp, setMaxtemp] = useState();
  const [avgTemp, setAvgtemp] = useState();
  const [minHumidity, setMinHumidity] = useState(0);
  const [maxHumidity, setMaxHumidity] = useState(0);
  const [avgHumidity, setAvgHumidity] = useState();
  const [curWC, setcurWC] = useState('');

  const [nextFour1, setNextFour1] = useState();
  const [nextFour2, setNextFour2] = useState();
  const [nextFour3, setNextFour3] = useState();
  const [nextFour4, setNextFour4] = useState();

  const [nextFourH1, setNextFourH1] = useState();
  const [nextFourH2, setNextFourH2] = useState();
  const [nextFourH3, setNextFourH3] = useState();
  const [nextFourH4, setNextFourH4] = useState();

  const [wcodeFor4, setWC4] = useState([]);


  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);

  const setcoords = async () => {
    let location = await Location.getCurrentPositionAsync({});
    let lat = location.coords.latitude
    let long = location.coords.longitude
    setlatitude(lat);
    setlongitude(long);
  }



  const date = new Date();
  let day = date.getDay().toString();
  let hr = date.getHours().toString();
  let mn = date.getMinutes().toString();
  let mon = date.getMonth().toString();
  let dt = date.getDate().toString();
  let dayInt = parseInt(day);


  const setCurentTemperature = async () => {

    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: latitude,
          lon: longitude
        })
      };
      const response = await fetch('https://sangli-feeds-backend.onrender.com/api/meto_hourly/current', requestOptions);
      const json = await response.json();
      setTemp(json.temperature);
      setFtemp(((json.temperature) * 9 / 5) + 32);
      setMintemp(json.mintemp[0])
      setMaxtemp(json.maxtemp[0])
      if (json.weathercode >= 0 && json.weathercode <= 3) {
        setcurWC('Sunny');
      }
      else {
        setcurWC('Cloudy')

      }
    } catch (err) {
      alert("Erro");
    }


  }


  const setHourlyForcast = async () => {

    try {

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: latitude,
          lon: longitude
        })
      };
      const ag = await fetch('https://sangli-feeds-backend.onrender.com/api/meto_hourly/hourly-forecast', requestOptions);
      let ag1 = await ag.json();

      let relh1 = [ag1.relativehumidity]
      var mn = 0, mx = 0;
      for (let i = 0; i < 24; i++) {
        
        if (mn === 0) {
          mn = ag1.relativehumidity[i];
        }
        else if (ag1.relativehumidity[i] > mx) {
          mx = ag1.relativehumidity[i];
        }
        else if (ag1.relativehumidity[i] < mn) {
          mn = ag1.relativehumidity[i];
        }
        else {
          continue;
        }
      }

      setMinHumidity(mx);
      setMaxHumidity(mn);
      setAvgHumidity()

      const ndate = new Date();
      let h = ndate.getHours().toString();

      setrelativehumidity_2m(ag1.relativehumidity[h]);

      let avg = 0;
      for (let i = 0; i < 7; i++) {
        avg += ag1.temperature_2m[i];
      }
      setAvgtemp((avg / 7).toPrecision(3));


      let f1 = 0, h1 = 0, f2 = 0, h2 = 0, f3 = 0, h3 = 0, f4 = 0, h4 = 0;

      for (let i = 0; i < 24; i++) {
        f1 += ag1.temperature_2m[i];
        h1 += ag1.relativehumidity[i];
      }

      for (let i = 24; i < 48; i++) {
        f2 += ag1.temperature_2m[i];
        h2 += ag1.relativehumidity[i];
      }

      for (let i = 48; i < 72; i++) {
        f3 += ag1.temperature_2m[i];
        h3 += ag1.relativehumidity[i];
      }

      for (let i = 72; i < 96; i++) {
        f4 += ag1.temperature_2m[i];
        h4 += ag1.relativehumidity[i];
      }

      setNextFour1((f1 / 24).toPrecision(3));
      setNextFour2((f2 / 24).toPrecision(3))
      setNextFour3((f3 / 24).toPrecision(3));
      setNextFour4((f4 / 24).toPrecision(3));

      setNextFourH1((h1 / 24).toPrecision(3));
      setNextFourH2((h2 / 24).toPrecision(3))
      setNextFourH3((h3 / 24).toPrecision(3));
      setNextFourH4((h4 / 24).toPrecision(3));

      setWC4(ag1.weathercodeFor4);

    } catch (err) {
      alert(err);
    }

  }

  useEffect(() => {
    async function fetchData() {

      setcoords()

      setCurentTemperature();

      setHourlyForcast();
    }
    fetchData();
  }, [])




  switch (mon) {
    case '0':
      mon = 'Jan'
      break;
    case '1':
      mon = 'Feb'
      break;
    case '2':
      mon = 'Mar'
      break;
    case '3':
      mon = 'Apr'
      break;
    case '4':
      mon = 'May'
      break;
    case '5':
      mon = 'Jun'
      break;
    case '6':
      mon = 'Jul'
      break;
    case '7':
      mon = 'Aug'
      break;
    case '8':
      mon = 'Sept'
      break;
    case '9':
      mon = 'Oct'
      break;
    case '10':
      mon = 'Nov'
      break;
    case '11':
      mon = 'Dec'
      break;
  }

  let day2 = '';
  let day3 = '';
  let day4 = '';
  let day5 = '';
  switch (dayInt) {
    case 0:
      day = 'Sun'
      day2 = 'Mon'
      day3 = 'Tue'
      day4 = 'Wed'
      day5 = 'Thu'
      break;
    case 1:
      day = 'Mon'
      day2 = 'Tue'
      day3 = 'Wed'
      day4 = 'Thu'
      day5 = 'Fri'
      break;
    case 2:
      day = 'Tue'
      day2 = 'Wed'
      day3 = 'Thu'
      day4 = 'Fri'
      day5 = 'Sat'
      break;
    case 3:
      day = 'Wed'
      day2 = 'Thus'
      day3 = 'Fri'
      day4 = 'Sat'
      day5 = 'Sun'
      break;
    case 4:
      day = 'Thu'
      day2 = 'Fri'
      day3 = 'Sat'
      day4 = 'Sun'
      day5 = 'Mon'
      break;
    case 5:
      day = 'Fri'
      day2 = 'Sat'
      day3 = 'Sun'
      day4 = 'Mon'
      day5 = 'Tue'
      break;
    case 6:
      day = 'Sat'
      day2 = 'Sun'
      day3 = 'Mon'
      day4 = 'Tue'
      day5 = 'Wed'
      break;

  }

  const ref = useRef<BottomSheetRefProps>(null);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View>

        {/*1. Background Image According to data from back end */}
        <View>
          <Image
            source={{ uri: images[0] }}
            style={{ width, height, resizeMode: 'cover' }}
          />
        </View>



        {/*2. Date and Time Section */}

        <View style={{
          position: 'absolute',
          top: '10%',
          justifyContent: 'center',
          width: '90%',
          marginHorizontal: '5%',
          flexDirection: 'row'
        }} >

          <View style={{ width: '50%' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: 'white' }}>{day}, {dt} {mon}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 40, color: 'white' }}>{hr} : {mn}</Text>
            </View>
          </View>
          <View style={{ width: '25%', marginLeft: 50, marginTop: 15 }}>
            <Button style={{ alignItems: 'center', marginRight: 100 }} type="solid" radius={100} size='md'
              onPress={() => {
                setcoords();

                setCurentTemperature();

                setHourlyForcast();
              }}

            ><Ionicons name="refresh" size={25} color="red" /></Button>
          </View>
        </View>

        {/*3. Temperature Section */}

        <View style={{
          position: 'absolute',
          top: '27%',
          justifyContent: 'center',
          width: '90%',
          marginHorizontal: '5%'
        }} >

          {/* 3.1 Tempetature and Icon  */}
          <View style={{ flexDirection: 'row', width: '100%' }}>

            <View style={{ marginLeft: '0%', marginBottom: '4%' }}>
              <MaterialCommunityIcons name="thermometer" size={80} color="white" />
            </View>

            <View style={{ flexDirection: 'column', width: '100%' }}>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={{ fontSize: 36, color: 'white' }}>{ctemp}{ctempUnit} / </Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={{ fontSize: 36, color: 'white' }}>{ftemp}{ftempUnit}  </Text>
                </View>
                <View>

                  {/* <Button type="solid" radius={100} size='md' onPress={()=>{
                    if(tempUnit == '°C')setTempUnit('°F');
                    else setTempUnit('°C');
                  }} ><Text style={{fontSize : 40 , color: 'white'}}> {tempUnit == '°C' ? '°F' : '°C' } </Text> </Button> */}
                </View>
              </View>


              <View style={{ flexDirection: 'row' }}>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20, color: 'white' }}>{curWC}</Text>

                </View>



              </View>

            </View>
          </View>

          {/* 3.2 Min Max Avg of Temperature */}

          <View style={{
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 1000,
            opacity: 1,
            justifyContent: 'center',
            paddingHorizontal: '2.5%',
            flexDirection: 'row',
            padding: '1%'
          }}>
            <View style={{ width: '33%', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 20 }} >
                {avgTemp}
              </Text>
              <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 20 }} >
                Avg.
              </Text>
            </View>

            <View style={{ width: '33%', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 20 }} >
                {minTemp}
              </Text>
              <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 20 }} >
                Min
              </Text>
            </View>
            <View style={{ width: '33%', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 20 }} >
                {maxTemp}
              </Text>
              <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 20 }} >
                Max
              </Text>
            </View>
          </View>


        </View>




        {/*4. Humidity Section */}
        <View style={{
          position: 'absolute',
          top: '55%',
          justifyContent: 'center',
          width: '90%',
          marginHorizontal: '5%'
        }} >

          {/* 4.1 Humidity And Icon */}
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginLeft: '0%', marginBottom: '4%' }}>
              <Entypo name="drop" size={80} color="white" />
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 40, color: 'white' }}>{relativehumidity_2m}{'%'}</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: 'white' }}>Humid</Text>
              </View>
            </View>
          </View>

          {/* 4.2 Min Max Avg Humidity */}
          <View style={{
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 1000,
            opacity: 1,
            justifyContent: 'center',
            paddingHorizontal: '2.5%',
            flexDirection: 'row',
            padding: '1%'
          }}>
            <View style={{ width: '33%', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 20 }} >
                {avgHumidity}
              </Text>
              <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 20 }} >
                Avg.
              </Text>
            </View>

            <View style={{ width: '33%', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 20 }} >
                {maxHumidity}
              </Text>
              <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 20 }} >
                Min
              </Text>
            </View>
            <View style={{ width: '33%', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 20 }} >
                {minHumidity}
              </Text>
              <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 20 }} >
                Max
              </Text>
            </View>
          </View>

        </View>


        {/* Modal Content */}
        <BottomSheet ref={ref}>
          <View style={{ height: '100%', backgroundColor: color.secondary }}>


            {/* 1st  Prediction*/}
            <View style={{ height: '10%', borderWidth: 2, borderColor: 'white', margin: 20, borderRadius: 20, flexDirection: 'row' }}>
              <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 15 }} >{day2}</Text>
                {/* <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 15 }} >{parseInt(dt) + 1} {mon}</Text> */}
              </View>
              <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                {/* <Ionicons name="sunny-sharp"  size={50} color="yellow" /> */}
                {

                  wcodeFor4[0] = 0 ? <Ionicons name="sunny-sharp" size={50} color="yellow" />

                    : wcodeFor4[0] = 1 ? <Ionicons name="sunny-sharp" size={50} color="yellow" />

                      : wcodeFor4[0] >= 60 ? <FontAwesome5 name="cloud-rain" size={50} color="lightblue" />
                        : <AntDesign name="cloud" size={50} color="lightblue" />
                }
              </View>
              <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 20 }} >{nextFour1}/{nextFourH1}{'%'}</Text>
                <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 15 }} >{wcodeFor4[0] = 0 ? 'sunny' : wcodeFor4[0] = 1 ? 'mainly clear' : 'overcast'}</Text>
              </View>
            </View>

            {/* 2nd Prediction */}

            <View style={{ height: '10%', borderWidth: 2, borderColor: 'white', margin: 20, borderRadius: 20, flexDirection: 'row' }}>
              <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 15 }} >{day3}</Text>
                {/* <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 15 }} >{parseInt(dt) + 1} {mon}</Text> */}
              </View>
              <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                {/* <FontAwesome5 name="cloud-rain" size={50} color="lightblue" /> */}
                {

                  wcodeFor4[0] = 0 ? <Ionicons name="sunny-sharp" size={50} color="yellow" />

                    : wcodeFor4[0] = 1 ? <Ionicons name="sunny-sharp" size={50} color="yellow" />

                      : wcodeFor4[0] >= 60 ? <FontAwesome5 name="cloud-rain" size={50} color="lightblue" />
                        : <AntDesign name="cloud" size={50} color="lightblue" />
                }
              </View>
              <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 20 }} >{nextFour2}/{nextFourH2}{'%'}</Text>
                <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 15 }} >{wcodeFor4[1] = 0 ? 'sunny' : wcodeFor4[1] = 1 ? 'mainly clear' : 'overcast'}</Text>
              </View>
            </View>

            {/* 3rd Prediction */}

            <View style={{ height: '10%', borderWidth: 2, borderColor: 'white', margin: 20, borderRadius: 20, flexDirection: 'row' }}>
              <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 15 }} >{day4}</Text>
                {/* <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 15 }} >{parseInt(dt) + 1} {mon}</Text> */}
              </View>
              <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                {/* <AntDesign name="cloud" size={50} color="lightblue" /> */}
                {

                  wcodeFor4[0] = 0 ? <Ionicons name="sunny-sharp" size={50} color="yellow" />

                    : wcodeFor4[0] = 1 ? <Ionicons name="sunny-sharp" size={50} color="yellow" />

                      : wcodeFor4[0] >= 60 ? <FontAwesome5 name="cloud-rain" size={50} color="lightblue" />
                        : <AntDesign name="cloud" size={50} color="lightblue" />
                }
              </View>
              <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 20 }} >{nextFour3}/{nextFourH3}{'%'}</Text>
                <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 15 }} >{wcodeFor4[2] = 0 ? 'sunny' : wcodeFor4[2] = 1 ? 'mainly clear' : 'overcast'}</Text>
              </View>
            </View>

            {/* 4th Prediction */}

            <View style={{ height: '10%', borderWidth: 2, borderColor: 'white', margin: 20, borderRadius: 20, flexDirection: 'row' }}>
              <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 15 }} >{day5}</Text>
                {/* <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 15 }} >{parseInt(dt) + 1} {mon}</Text> */}
              </View>
              <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                {/* <Ionicons name="sunny-sharp" size={50} color="yellow" /> */}
                {

                  wcodeFor4[0] = 0 ? <Ionicons name="sunny-sharp" size={50} color="yellow" />

                    : wcodeFor4[0] = 1 ? <Ionicons name="sunny-sharp" size={50} color="yellow" />

                      : wcodeFor4[0] >= 60 ? <FontAwesome5 name="cloud-rain" size={50} color="lightblue" />
                        : <AntDesign name="cloud" size={50} color="lightblue" />
                }
              </View>
              <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 20 }} >{nextFour4}/{nextFourH4}{'%'}</Text>
                <Text style={{ color: 'white', fontFamily: 'merriweather', fontSize: 15 }} >{wcodeFor4[3] = 0 ? 'sunny' : wcodeFor4[3] = 1 ? 'mainly clear' : 'overcast'}</Text>
              </View>
            </View>


          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  )
}


const styles = StyleSheet.create({

})