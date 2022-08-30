import { StyleSheet, Text, View,TextInput,TouchableOpacity ,Image, Alert,ActivityIndicator} from 'react-native';
import React, { useState,useEffect } from 'react'
import axios from 'axios';


const ClientWaiting = ({route,navigation}) => {
    const {socket,email,sname}=route.params;
    const [loader,setLoader]=useState(true)
    const [samtext,setText]=useState('Please Wait for the Vendor')
    const [callapi,setCall]=useState(false)



    const check_vendor= async() =>{
      await axios.put('http://192.168.4.202:3300/assign_vendor',{
        sname:sname

      }).then(function(response){
        if(response.status===200)
        {
          setLoader(false)
          Alert.alert('Vendor Assigned')
          setText('Thanks for waiting')
          setCall(true)
          setTimeout(() => {
            navigation.navigate('ClientChat',{
              socket:socket,
              sname:sname,
              vendor_email:response.data,
              email:email
            })
            }, 3000);


        }
      }).catch(function(error){console.log(error);});
      
    }
  
    useEffect(() => {

      const interval = setInterval(() => {
        if(callapi===false)
        {
        check_vendor();
        console.log('API called after ...')
        console.log(callapi)
        }
      }, 5000);
      return () =>{ clearInterval(interval)};  
    }, [callapi]);

    // useEffect(()=>{
    //   if(callapi===true)
    //   {
    //     const timer =  setTimeout(() => navigation.navigate('ClientChat'), 4000);
    //   }
    //   return () => clearTimeout(timer);
    // },[callapi])
  

  return (
    <View style={styles.container}>
        <View style={styles.comb_circle}>
        <View style={styles.circle1}/>
        <View style={styles.circle2}/></View>
        <View style={styles.header}>
        <Text style={{fontWeight:'bold',fontSize:25}}>Welcome {email}</Text>
        <Text style={{fontWeight:'bold',fontSize:25}}>{samtext}</Text>
        </View> 
        {
        loader ?
        <View style={styles.body}>
            <ActivityIndicator size={'large'} color={'#F86464'} />
        </View>
        : <Text style={{fontWeight:'bold',fontSize:20}}>You will be redirected to ChatRoom Shortly</Text>
        }

    </View>
  )
}

export default ClientWaiting;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent:'center'
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
      header:{
        alignItems:'center',

      },
      body:{
        marginTop:'10%'
      },
})