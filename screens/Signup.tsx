import React , {useState} from 'react'
import { Text, View ,TextInput,Dimensions ,StyleSheet,TouchableOpacity ,Image,ImageBackground} from 'react-native'
import Colors from '../constants/color'

const screenHeight = Dimensions.get('window').height+30;
const screenWidth = Dimensions.get('window').width;

export default function Signup(props) {
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [pass,setPass] = useState('');

  const clickSignup = async () => {


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name : name,
      username: email,
      password: pass })
  };


    fetch('https://sangli-feeds-backend.onrender.com/api/userReg/signup',requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.message = "user registerd successfully") {
          alert('You are logged in.');
          props.navigation.navigate('Login');
        } else {
          alert('Please check your login information.');
        }
      }).catch(err => console.log(err));
  }





  return (
    <ImageBackground
                source={
                    require('../assets/signup.jpeg')
                }
                resizeMode="stretch"
                style={styles.img}>
    <View style={styles.container}>
    <View style={styles.inputView} >
        <TextInput  
          style={styles.inputText}
          placeholder="Name" 
          placeholderTextColor="#888"
          onChangeText={(text)=>{setName(text)}}
          value={name}
        />
      </View>
      <View style={styles.inputView} >
        <TextInput  
          style={styles.inputText}
          placeholder="Email" 
          placeholderTextColor="#888"
          onChangeText={(text)=>{setEmail(text)}}
          value={email}
        />
      </View>
      <View style={styles.inputView} >
        <TextInput  
          style={styles.inputText}
          placeholder="Password" 
          placeholderTextColor="#888"
          onChangeText={(text) => {setPass(text)}}
          value={pass}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity 
        style={styles.loginBtn}
        onPress={(e)=>{
          clickSignup()
        }}
      >
          <Text style={{...styles.loginText ,color : 'white'}}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=>{
          props.navigation.navigate('Login')
        }
        }
      >
          <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      
    </View>
    </ImageBackground>
   
  )
}


const styles = StyleSheet.create({
  img: {
    height: screenHeight,
    width: screenWidth,

},  
  container: {
    flex: 1,
    // backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView:{
    width:"80%",
    backgroundColor:"rgba(255,255,255,0.6)",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    fontFamily : 'open-sans' 
  },
  loginBtn:{
    width:"80%",
    backgroundColor: 'rgba(0,0,0,0.9)' ,
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    marginBottom:10
  },
  loginText : {
    fontFamily : 'open-sans' , 
    fontSize : 15,
  }
})