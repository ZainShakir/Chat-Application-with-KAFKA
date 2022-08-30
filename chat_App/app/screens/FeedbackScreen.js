import { TouchableOpacity,Easing,StyleSheet, Text,Button, Alert,Image,View ,SafeAreaView,TouchableWithoutFeedback, Animated} from 'react-native';
import React,{useEffect,useState} from 'react'
import {FontAwesome} from "@expo/vector-icons"
import axios from 'axios';

const numStars=5

const FeedbackScreen = ({route,navigation}) => {
  //API Part
  const {sname,vendor_email,email}=route.params;
  console.log(route.params)
  const scoring = async()=>{
    await axios.post('http://192.168.4.202:3300/rate_session',{
      sname:sname,
      vendor_email: vendor_email,
      client_email:email,
      score:rating
    }).then(function(response){if(response.status==200){
      Alert.alert("Thank You for Submitting Feedback")
    }
  }).catch(function(error){console.log(error);});
  }

  const submitfeedback=()=>{
    scoring()
    setTimeout(() => {
      navigation.navigate('Home')
      }, 4000);
  }

  //Animation Part
  const [rating,setRating]=useState(0)
  const [animation,setAnimation]=useState(new Animated.Value(1))
  const animate = () =>{
    Animated.timing(animation,{
      toValue:2,
      duration:400,
      easing:Easing.ease,
      useNativeDriver:true
    }).start(()=>{
      animation.setValue(1)
    })
  }
  const animateOpacity = animation.interpolate({
    inputRange:[1,1.2,2],
    outputRange:[1,0.5,1]
  })

  const animateScale = animation.interpolate({
  inputRange:[1,1.5,2],
  outputRange:[1,1.4,1]
  })
  const animateWobble = animation.interpolate({
    inputRange :[1,1.25,1.75,2],
    outputRange:["0deg","-3deg","3deg","0deg"]
  })

  const animationStyle = {
    transform : [{scale:animateScale},{rotate:animateWobble}],
    opacity:animateOpacity
  }

  let stars=[]
  for(let x=1; x<=numStars;x++)
  {
    stars.push(
      <TouchableWithoutFeedback key={x} onPress={()=>{
        setRating(x),
        animate()
      }}>
        <Animated.View style={x <= rating ? animationStyle :""}> 
          <Star filled={ x <= rating ? true : false}/>
          </Animated.View>
       
      </TouchableWithoutFeedback>
    )
  }


  return (
    <View style={styles.container}>
         <View style={styles.comb_circle}>
        <View style={styles.circle1}/>
        <View style={styles.circle2}/></View>
        <Image style={styles.img}source={require("../assets/feedback.png")}/>
        <Text style={styles.tex}>Please Rate This Conversation</Text>
      <View style={styles.star}>{stars}</View>
      <TouchableOpacity
       style={styles.button1}
       onPress={() =>submitfeedback()}
     >
       <Text style={styles.tbut}>Submit Feedback</Text>
     </TouchableOpacity>
    </View>
  )
}

class Star extends React.Component{
  render()
  {
    return <FontAwesome 
    name={this.props.filled === true ? "star" :"star-o"}
     color="#F86464" size={30} 
    style={{ marginHorizontal:6}} />
  }
}

export default FeedbackScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
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
  img:{
    height:"40%",
    width:"85%",
    resizeMode:'contain',
    alignSelf:'center',
    marginTop:'40%'
  },
  tex:{
    alignSelf:'center',
    fontWeight:'bold',
    marginTop:'5%',
    fontSize:20
  },
  star:{
    flexDirection:"row", 
    alignSelf:'center',
    marginTop:'10%'
  },
  button1:{
    alignItems: "center",
    backgroundColor: "#F86464",
    padding: 10,
    borderRadius:30,
    width:"40%",
    marginTop:"10%",
    alignSelf:'center'
  }
})