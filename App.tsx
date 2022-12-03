import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';



// Navigation
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigation/navigator';


// Importing font
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

const fetchFont = ()=>{
  return Font.loadAsync({
    'newrocker' : require('./assets/fonts/New_Rocker/NewRocker-Regular.ttf'),
    'merriweather' : require('./assets/fonts/Merriweather/Merriweather-Regular.ttf')
  })
}



export default function App() {
  return (
    <NavigationContainer>
      <Navigator/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  text : {
    fontFamily : 'newrocker'
  }
});
