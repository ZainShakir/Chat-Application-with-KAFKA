import { StyleSheet, Text,TouchableOpacity,TextInput,Button, Alert,Image,View ,SafeAreaView} from 'react-native';
import React, { useState } from 'react'
import axios from 'axios';

const ServerloginScreen = ({navigation}) => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [errortext,setError]=useState('')

  const login = async ()=>{
    await axios.put('http://192.168.4.202:3300/login',{
      email:email,
      password:password
    }).then(function(response){
      if(response.status===200)
      {

        navigation.navigate('Vendorwaiting',{
          email: response.data
        })
      }
      else
      {
        Alert.alert(response.data)
      }

    }).catch(function(error){console.log(error);});

  }

  const validate = ()=>{
    if(email==='' && password==='')
    {
      setError("Inputs Fields Cant Be Empty")
    }
    else
    {
      setError("");
      login()

    }


  }
  return (
    <View>
     <View style={styles.comb_circle}>
    <View style={styles.circle1}/>
    <View style={styles.circle2}/>
    </View>
    <Text style={styles.header}>Login</Text>
    <View style={styles.inputcon1}>
       <Text style={styles.email}>Enter Email:</Text>
       <TextInput
       style={styles.input}
       placeholder="Enter you Email"
       keyboardType="email-address"
       autoCapitalize='none'
       autoCorrect={false}
      onChangeText={(text)=>{
        setEmail(text)
      }}
     />
     </View>
     <View style={styles.inputcon1}>
       <Text style={styles.email}>Enter Your Password:</Text>
       <TextInput
       style={styles.input}
       autoCapitalize='none'
       autoCorrect={false}
       secureTextEntry={true}
       onChangeText={(text)=>{
        setPassword(text)
      }}
     />
      <Text style={{color:'red',marginLeft:'4%' , marginTop:'2%'}}>{errortext}</Text>
       </View>
       <TouchableOpacity
       style={styles.button1}
       onPress={() => validate()}
     >
       <Text style={styles.tbut}>Login</Text>
     </TouchableOpacity>

     <Image style={styles.secure}source={require("../assets/secure.png")}/>

   </View>
  )
}

  

export default ServerloginScreen

const styles = StyleSheet.create({
  comb_circle:{
    height:'100%',
    width:'100%',
    position:'absolute',
  },


  circle1:{
    width:'39%',
    height:'18%',
    borderRadius: 75,
    opacity:0.48,
    backgroundColor:"#FF6B6B",
    top:'-1%',
    left:'-23%',
    position:'absolute'
  },
  circle2:{
    width:'30%',
    height:'18%',
    borderRadius: 75,
    opacity:0.48,
    top:'-8%',
    left:'-4%',
    backgroundColor:"#FF6B6B"
  },
    header:{
        paddingTop:'25%',
        fontWeight:'bold',
        alignSelf:'center',
        fontSize:25,
    },
    inputcon1:
    {
        marginTop:'5%',

    },
    email:{

        paddingLeft:'5%',
        fontSize:18,
        paddingBottom:'2%'
    },
    input:{
        borderWidth:1,
        borderColor:"rgba(0,0,0,0.3)",
        marginLeft:'4%',
        marginRight:'4%',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:1,
        backgroundColor:"white",
        fontSize:18,
    },
    button1:{
        alignItems: "center",
        backgroundColor: "#F86464",
        padding: 10,
        borderRadius:30,
        width:"40%",
        marginTop:"10%",
        alignSelf:'center'

    },
    tbut:{color:'white'},

    secure:{
        height:"45%",
        width:"85%",

        resizeMode:'contain',
        alignSelf:'center'

    }
})