import { StyleSheet, Text, View,TextInput,TouchableOpacity ,Image, Alert} from 'react-native';
import axios from 'axios'
import React,{ useEffect,useState } from 'react';

import io from 'socket.io-client'

const socket =io.connect("http://192.168.4.202:3001");

const ClientRoom = ({navigation}) => {
    const [email,setEmail]=useState('')
    const [session,setSession]=useState('')
    const[perror,setError]=useState('')

    
    const joinRoom=()=>{
      if (email !=="" && session !==""){
        socket.emit("join_room",session);
  
      }
    }
  const create_Session=async ()=>{
    await axios.post('http://192.168.4.202:3300/create_session',{
      email:email,
      sname:session
    }).then(function(response){
      if(response.status===200)
      {
        navigation.navigate('ClientWaiting',{
          socket:socket,
          email: email,
          sname:session
        })
      }
      else
      {
        Alert.alert(response.data)
      }

    }).catch(function(error){console.log(error);});
  }

  const validate = ()=>{
    if(email.length >= 1 && session.length>= 1 )
    {
      setError('')
      joinRoom()
      create_Session()
    }
    else{
      setError('Email or Session name cant be empty')
    }

  }

    return (
        <View style={styles.container}>
        <View style={styles.comb_circle}>
        <View style={styles.circle1}/>
        <View style={styles.circle2}/></View>
        <Text style={{alignSelf:'center',marginTop:'20%',fontWeight:'bold',fontSize:27}}>Create Session</Text>
        <View style={{marginLeft:'8%',marginTop:'10%'}}>
          <Text style={{fontSize:20}}>Enter Email:</Text>
          <TextInput
           style={styles.input}
           placeholder="Enter your Email"
           keyboardType="email-address"
           autoCapitalize='none'
           autoCorrect={false}
           onChangeText={(text)=>{
            setEmail(text)
           }}
         />
        </View>
        <View style={{marginLeft:'8%',marginTop:'5%'}}>
          <Text style={{fontSize:20}}>Enter Session Name:</Text>
          <TextInput
           style={styles.input}
           placeholder="Enter Session Name"
           keyboardType="email-address"
           autoCapitalize='none'
           autoCorrect={false}
           onChangeText={(text)=>{
            setSession(text)
           }}
         />
        </View>
        <Text style={{color:'red',marginLeft:'5%',marginTop:'2%'}}>{perror}</Text>
        <TouchableOpacity
           style={styles.button1}
           onPress={() => validate()}
         >
           <Text style={styles.tbut}>Create Session</Text>
         </TouchableOpacity>
         <Image style={styles.img}source={require("../assets/client.png")}/>
        </View>
      )
}

export default ClientRoom


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
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
    input:{
      borderWidth:1,
      borderColor:"rgba(0,0,0,0.3)",
      marginRight:'8%',
      marginTop:'4%',
      paddingHorizontal:15,
      paddingVertical:10,
      borderRadius:1,
      backgroundColor:"white",
      fontSize:18,
  },
  button1:{
    alignItems: "center",
    justifyContent:'center',
    backgroundColor: "#F86464",
    padding: 10,
    borderRadius:30,
    width:"50%",
    height:'6%',
    marginTop:"10%",
    alignSelf:'center'
  
  },
  
  img:{
    height:"40%",
    width:"85%",

    resizeMode:'contain',
    alignSelf:'center'

}
  });
  