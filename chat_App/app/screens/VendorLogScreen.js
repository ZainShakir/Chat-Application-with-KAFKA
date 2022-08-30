import { StyleSheet,View, Text ,TextInput,TouchableOpacity, ScrollView, Alert} from 'react-native'
import React,{useEffect,useState,useCallback} from 'react'
import axios from 'axios';
import io from 'socket.io-client'

const socket =io.connect("http://192.168.4.202:3001");

const VendorLogScreen = ({route,navigation}) => {
  const {email}=route.params;
  //Client 1
  const [currentMessage,setCurrentMessage] =useState('');
  const [messageList,setMessageList]=useState([])
  const [client1,getClient1]=useState(false)
  const [sname,getSession1]=useState('')
  const [cemail,getEmail1]=useState('Waiting for Client')
  const [swapscreens,setScreens]=useState(true)

  //Client 2

  const [messageList2,setMessageList2]=useState([])
  const [client2,getClient2]=useState(false)
  const [sname2,getSession2]=useState('')
  const [cemail2,getEmail2]=useState('Waiting for Client')

  //var sname1;
 // var sname3;
  

  // const joinRoom1=()=>{
  //   if (email !=="" && sname !==""){
  //     console.log("This is called")
  //     socket.emit("join_room",sname);
  //   }
  // }


  const update_client= async()=>{
    await axios.put('http://192.168.4.202:3300/exit_chat',{
        email:email
    }).then(function(response){
      if(response.status===200)
      {
        console.log("Updated")
      }
    }).catch(function(error){console.log(error);});
  }


  const exitchat = async (room)=>{
    await socket.emit("leave_room",room)
   
  }
  //send message 1
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

  // Send message 2
  const sendMessage2 = async ()=>{
    if(currentMessage !==""){
      const messageData={
        room: sname2,
        author:email,
        message:currentMessage,
        time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(), 
      };
      await socket.emit("send_message",messageData);
      setMessageList2((List)=>[...List,messageData]);
    }
  };
  
 const exit_chat = useCallback((data)=>{
  console.log(data)
  console.log(sname)
  if(data.localeCompare(sname)==0){
    // exitchat(sname)
    console.log("this got hit")
    update_client()
    getEmail1('Waiting for Client')
    getSession1('')
    setMessageList([])
    getClient1(false)
  }
  else
  {
    update_client()
    console.log("The second one got hit")
    getEmail2('Waiting for Client')
    getSession2('')
    setMessageList2([])
    getClient2(false)
  }

 },[sname,sname2]);

 useEffect(()=>{
  socket.removeAllListeners('user_left');
  socket.on("user_left",exit_chat)
 },[socket,exit_chat])


  const receiveMessage = useCallback((data) => {
      console.log(data.room)
      console.log("sname is  :"+ sname)
      console.log("ans: "+data.room.localeCompare(sname))
      if(data.room.localeCompare(sname)==0 && sname!=="")
      {
      setMessageList((List)=>[...List,data]);
      }
      else if (sname2 !=="")
      {
        console.log("This one executed")
        setMessageList2((List)=>[...List,data]);
      }
  }, [sname,sname2]);

  useEffect(()=>{
    socket.removeAllListeners('receive_message');
    socket.on("receive_message",receiveMessage);
 //   socket.removeAllListeners('user_left');
  },[socket, receiveMessage])

  const get_client=async ()=>{
    await axios.put('http://192.168.4.202:3300/get_client',{
      email:email
    }).then(function(response){
      if(response.status===200)
      {
        if(client1===false)
        {
        getClient1(true)
       // sname1=response.data['sname'];
        getSession1(response.data['sname'])
        getEmail1(response.data['client_email'])
        socket.emit("join_room",response.data['sname']);
   //     joinRoom1();
        Alert.alert('Session ' +response.data['sname']+' joined')
        }
        else if (client2===false)
        {
          getClient2(true)
          getSession2(response.data['sname'])
          getEmail2(response.data['client_email'])
     //     sname3=response.data['sname']
          socket.emit("join_room",response.data['sname']);
     //     joinRoom1();
          Alert.alert('Session ' +response.data['sname']+' joined')
        }
      }
    }).catch(function(error){console.log(error);});
  }
  useEffect(() => {

    const interval = setInterval(() => {
      if(client1===false || client2===false)
      {
      get_client()
      console.log('API called after for vendor ...')
      console.log(client1 +" and " + client2)
      }
      // else if(client2===false)
      // {
      //   get_client()
      //   console.log('API for client 2 called after for vendor ...')
      //   console.log(client2)
      // }
    }, 5000);
    return () =>{ clearInterval(interval)};
  
  }, [client1,client2]);

  
  return (
    <View style={{flex:1}}>
        <View style={styles.comb_circle}>
        <View style={styles.circle1}/>
        <View style={styles.circle2}/></View>
      
      <View style={{flex:0.5 ,flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>  
        <Text style={{fontWeight:'bold'}}>Session Name:{swapscreens ? sname : sname2}</Text>
        <Text  style={{fontWeight:'bold'}}>Client Email:{swapscreens ? cemail : cemail2}</Text>    
      </View>
      <View style={styles.body}>
        <ScrollView>
        {
          swapscreens ?
          messageList.map((messageContent, i)=>{
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
          :

          messageList2.map((messageContent,k)=>{
            return (<View key={k}>
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
              onPress={()=>{
                setScreens(!swapscreens);
              }}
            >
              <Text style={{alignSelf:'center',fontSize:22}}>{swapscreens ? "Client 2": "Client 1" }</Text>
            </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{
          if(swapscreens)
          {
            sendMessage();
          }
          else
          {
            sendMessage2();
          }
        }}
      >
        <Text style={{alignSelf:'center',fontSize:22}}>&#9658;</Text>
      </TouchableOpacity>
      </View>
      </View>
    </View>
  )
}

export default VendorLogScreen

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






// const VendorLogContainer = () => {
// const [vendorStates,SetScreen]=useState([]);
//  index
//

//   return (
//       Array(2).fill(0)

//   )
// }

// export defContainer