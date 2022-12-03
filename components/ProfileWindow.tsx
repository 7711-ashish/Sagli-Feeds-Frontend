import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from '../constants/color';

import { View , TouchableOpacity , Image , StyleSheet , Text , Linking } from 'react-native'

export default function ProfileWindow(props) {
  return (
    <View style={{margin : '2.5%' , elevation : 10}}>
        <TouchableOpacity>
            <Image
            source={props.imgSrc}
            style={styles.imageStyle}
            />

            <View style = {styles.profileStyle}>
                <View>
                <Text style={{textAlign : 'center' , color : 'white' }}>Pavan Shinde</Text>
                </View>
                <View style = {{  flexDirection : 'row'}} >              

                <View style={{width : '50%' , alignItems: 'center'  , justifyContent : 'center'}}
                    onTouchStart = {()=>{
                        Linking.openURL(props.linkedinUrl)
                    }}
                >
                    <Entypo name="linkedin" size={30} color="white" />  
                </View>

                <View style={{width : '50%' , alignItems: 'center'  , justifyContent : 'center'}}
                    onTouchStart = {()=>{
                        Linking.openURL(`mailto:${props.gmail}`)
                    }}
                >
                    <MaterialCommunityIcons name="gmail" size={30} color="white" />
                </View>
                </View>
            </View>

        </TouchableOpacity>
        </View>
  )
}


const styles = StyleSheet.create({
    imageStyle : {
        width : '70%' , 
        height : null , 
        aspectRatio : 0.6 ,
        flex : 1 , 
        resizeMode : 'cover', 
        borderRadius : 20  
      },
      profileStyle : { 
        width : '100%',
        aspectRatio : 2.5 , 
        backgroundColor : color.tertiary , 
        opacity : 0.7  , 
        position : 'absolute' , 
        bottom : '0%',
        borderBottomLeftRadius : 20 ,
        borderBottomRightRadius : 20,
    
      }
})