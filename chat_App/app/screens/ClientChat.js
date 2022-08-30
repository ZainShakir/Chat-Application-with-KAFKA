import { StyleSheet,View, Text ,TextInput,TouchableOpacity, ScrollView, Alert} from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from 'axios';


const ClientChat = ({route,navigation}) => {
    const {socket,sname,vendor_email,email}=route.params;
    const [currentMessage,setCurrentMessage] =useState('');
    const [messageList,setMessageList]=useState([])
    const sendMessage = async ()=>{
      if(currentMessage !==""){
        const messageData={
          room: sname,
          author:email,
          message:currentMessage,
          time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(), 
        };
        await socket.emit("send_message",messageData);
        setMessageList((List)=>[...List,messageData]);
      }
    };


    const exitchat = async ()=>{
      const test={
        room:sname,
        email:email
      }
      await socket.emit("leave_room",test);
      Alert.alert("Leaving Chat in 6 Seconds...");
     // end_message();
      setTimeout(() => {
        navigation.navigate('FeedbackScreen',{
          sname:sname,
          vendor_email:vendor_email,
          email:email
        })
        }, 6000);
    }
    useEffect(()=>{
      socket.on("receive_message",(data)=>{
        setMessageList((List)=>[...List,data]);
      });
    },[socket])
  
    return (
        <View style={{flex:1}}>
            <View style={styles.comb_circle}>
            <View style={styles.circle1}/>
            <View style={styles.circle2}/></View>
          
          <View style={{flex:0.5 ,flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>  
            <Text style={{fontWeight:'bold'}}>Session Name:{sname}</Text>
            <Text  style={{fontWeight:'bold'}}>Vendor Email:{vendor_email}</Text>    
          </View>
          <View style={styles.body}>
            <ScrollView>
            {
              messageList.map((messageContent,i)=>{
               return (<View key={i}>
                <View>
                <View style={styles.msgbody}>
                <Text style={{fontSize:20,paddingLeft:'1%'}}>{messageContent.message}</Text>
                </View>
                
    
                <View style={{flex:1,flexDirection:'row'} }>
                <Text style={{marginRight:"1%",marginLeft:'2.2%'}}>
                  {messageContent.time}
                </Text>
                <Text>
                  {
                    messageContent.author
                  }
                </Text>
                </View>
                </View>
               </View>)
              })
            }
            </ScrollView>
    
          </View>
          <View style={{flex:1,justifyContent:'center' }}>
          <TextInput placeholder='Enter Message...' style={styles.input} onChangeText={(text)=>setCurrentMessage(text)}/>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity
            style={styles.exit}
              onPress={()=>exitchat()}
            >
              <Text style={{alignSelf:'center',fontSize:22}}>Exit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={()=>sendMessage()}
            >
              <Text style={{alignSelf:'center',fontSize:22}}>&#9658;</Text>
            </TouchableOpacity>
  
      </View>
          </View>
        </View>
      )
}

export default ClientChat

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
    msgbody:{
      margin:'2%',
      borderWidth:1
    },
    body:{
      flex:4,
      borderWidth:1,
      margin:"2%",
      borderColor:'#F86464'
      
      
    },
    input:{
      height: 40,
      margin: 12,
      marginTop: 40,
      borderWidth: 1,
      padding: 10,
      borderColor:'#F86464'
    },
    button: {
      alignItems: "center",
      backgroundColor: "#F86464",
      padding: 15,
      marginLeft:'48%',
      marginRight:'4%',
      marginBottom:'7%'
    },
    exit:{
      backgroundColor: "#F86464",
      borderRadius:35,
    //  alignItems:'center',
     // alignSelf:'center',
     width:'30%',
     height:'40%',
    marginLeft:'5%',
    marginTop:'3%'
  
    }
  
  })