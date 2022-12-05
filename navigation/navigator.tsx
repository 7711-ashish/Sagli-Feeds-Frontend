import { Text, View } from "react-native";


// Imporing Screens

import HomeScreen from "../screens/HomeScreen";
import WeatherScreen from "../screens/WeatherScreen";
import DamScreen from "../screens/DamScreen";
import SoilMoistureSreen from '../screens/SoilMoistureScreen';
import TestScreen from '../screens/TestScreen';
import Crop from '../screens/CropScreen';
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import Logout from "../screens/Logout"
import AirQualityScreen from "../screens/AirQualityScreen";

// Navigation Options

import { createStackNavigator, HeaderStyleInterpolators } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentScrollView , DrawerItemList , DrawerItem } from "@react-navigation/drawer";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


// Importing Utilities
import color from "../constants/color";


const HomeScreenNavigator = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'red'
                }
            }}
        >
            <Stack.Screen
                name="HomeScreenNavigator"
                component={HomeScreen}
            />
        </Stack.Navigator>
    )
}

const WeatherScreenNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'purple'
                }
            }}
        >
            <Stack.Screen
                name="WeatherScreenNavigator"
                component={WeatherScreen}
            />
        </Stack.Navigator>
    )
}

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="HomeScreenNavigator"

            screenOptions={{
                drawerActiveTintColor: 'white',
                drawerActiveBackgroundColor: color.secondary,
                drawerInactiveTintColor: 'white',
                drawerStyle: {
                    backgroundColor: color.drawback
                },
                headerStyle: {
                    backgroundColor: color.primary,
                },
                headerTitleStyle: {
                    fontFamily: 'newrocker'
                },
                headerTintColor: 'white'

            }}

            drawerContent={
                (props)=>{
                    return (
                        <DrawerContentScrollView {...props}>
                            <DrawerItemList {...props} />
                            <DrawerItem label="Logout" activeTintColor="white" inactiveTintColor="white" onPress={() => props.navigation.navigate("Login")} />
                        </DrawerContentScrollView>
                      )
                }
            }
        >
            <Drawer.Screen
                name="Feeds"
                component={HomeScreen}
            />
            <Drawer.Screen
                name="Weather"
                component={WeatherScreen}
            />
            <Drawer.Screen
                name="Soil Moisture"
                component={SoilMoistureSreen}
            />
            <Drawer.Screen
                name="Crops"
                component={Crop}
            />
            <Drawer.Screen
                name = "Air Quality"
                component={AirQualityScreen}
            />
            <Drawer.Screen
                name="Info"
                component={DamScreen}
            />
          
        </Drawer.Navigator>
    )
}

const Navigator = ()=>{
    return(
    <Stack.Navigator
        screenOptions={{
            headerShown : false,
            headerStyle: {
                backgroundColor: color.secondary,
            },
            headerTitleStyle: {
                fontFamily: 'newrocker'
            },
            headerTintColor: 'white'
        }}
        initialRouteName='Login'
    >
        <Stack.Screen
            name='Login'
            component={Login}
        />
        <Stack.Screen
            name='SignUp'
            component={Signup}
        />
        
        <Stack.Screen
            name='DrawerNavigator'
            component={DrawerNavigator}
        />
    </Stack.Navigator>
    )
}




export default Navigator